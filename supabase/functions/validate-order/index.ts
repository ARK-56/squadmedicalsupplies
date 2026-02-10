import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip } = body;

    // Validate shipping fields
    const errors: string[] = [];

    if (!shipping_name || typeof shipping_name !== "string" || shipping_name.trim().length === 0) {
      errors.push("Name is required");
    } else if (shipping_name.length > 100) {
      errors.push("Name must be under 100 characters");
    }

    if (!shipping_address || typeof shipping_address !== "string" || shipping_address.trim().length === 0) {
      errors.push("Address is required");
    } else if (shipping_address.length > 200) {
      errors.push("Address must be under 200 characters");
    }

    if (!shipping_city || typeof shipping_city !== "string" || shipping_city.trim().length === 0) {
      errors.push("City is required");
    } else if (shipping_city.length > 100) {
      errors.push("City must be under 100 characters");
    }

    if (!shipping_state || typeof shipping_state !== "string" || shipping_state.trim().length === 0) {
      errors.push("State is required");
    } else if (shipping_state.length > 2) {
      errors.push("State must be a 2-letter code");
    }

    if (!shipping_zip || typeof shipping_zip !== "string" || shipping_zip.trim().length === 0) {
      errors.push("ZIP code is required");
    } else if (!/^\d{5}(-\d{4})?$/.test(shipping_zip.trim())) {
      errors.push("ZIP code must be a valid format (e.g. 75201 or 75201-1234)");
    }

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: "Validation failed", details: errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch user's cart items and recalculate total from actual product prices
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, product:products(id, name, price, in_stock, is_prescription_required)")
      .eq("user_id", user.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty or could not be loaded" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate products exist, are in stock, and calculate server-side total
    const orderErrors: string[] = [];
    let serverTotal = 0;

    const orderItems = cartItems.map((item: any) => {
      const product = item.product;
      if (!product) {
        orderErrors.push(`Product ${item.product_id} not found`);
        return null;
      }
      if (!product.in_stock) {
        orderErrors.push(`${product.name} is out of stock`);
        return null;
      }
      if (item.quantity < 1 || item.quantity > 99) {
        orderErrors.push(`Invalid quantity for ${product.name}`);
        return null;
      }
      serverTotal += product.price * item.quantity;
      return {
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        price_at_purchase: product.price,
      };
    });

    if (orderErrors.length > 0) {
      return new Response(JSON.stringify({ error: "Order validation failed", details: orderErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create order with server-calculated total
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: order, error: orderError } = await serviceClient
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: serverTotal,
        shipping_name: shipping_name.trim(),
        shipping_address: shipping_address.trim(),
        shipping_city: shipping_city.trim(),
        shipping_state: shipping_state.trim().toUpperCase(),
        shipping_zip: shipping_zip.trim(),
      })
      .select()
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ error: "Failed to create order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert order items
    const validItems = orderItems.filter(Boolean).map((item: any) => ({
      ...item,
      order_id: order.id,
    }));

    const { error: itemsError } = await serviceClient.from("order_items").insert(validItems);
    if (itemsError) {
      return new Response(JSON.stringify({ error: "Failed to save order items" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Clear cart
    await serviceClient.from("cart_items").delete().eq("user_id", user.id);

    return new Response(
      JSON.stringify({ order_id: order.id, total: serverTotal }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
