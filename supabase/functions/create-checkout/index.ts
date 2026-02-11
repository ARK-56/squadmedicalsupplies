import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
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

    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { shipping_name, shipping_address, shipping_city, shipping_state, shipping_zip } = body;

    // Validate shipping fields
    const errors: string[] = [];
    if (!shipping_name?.trim()) errors.push("Name is required");
    if (!shipping_address?.trim()) errors.push("Address is required");
    if (!shipping_city?.trim()) errors.push("City is required");
    if (!shipping_state?.trim()) errors.push("State is required");
    if (!shipping_zip?.trim()) errors.push("ZIP code is required");

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: "Validation failed", details: errors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch cart items with product details
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select("id, product_id, quantity, product:products(id, name, price, image_url, in_stock)")
      .eq("user_id", user.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Cart is empty" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate all products are in stock
    const stockErrors: string[] = [];
    for (const item of cartItems) {
      const product = (item as any).product;
      if (!product) stockErrors.push(`Product not found`);
      else if (!product.in_stock) stockErrors.push(`${product.name} is out of stock`);
    }
    if (stockErrors.length > 0) {
      return new Response(JSON.stringify({ error: "Validation failed", details: stockErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create order in pending state using service role
    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let serverTotal = 0;
    const orderItems = cartItems.map((item: any) => {
      const product = item.product;
      serverTotal += product.price * item.quantity;
      return {
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        price_at_purchase: product.price,
      };
    });

    const { data: order, error: orderError } = await serviceClient
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: serverTotal,
        status: "pending",
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
    const { error: itemsError } = await serviceClient.from("order_items").insert(
      orderItems.map((item: any) => ({ ...item, order_id: order.id }))
    );
    if (itemsError) {
      return new Response(JSON.stringify({ error: "Failed to save order items" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Build line items for Stripe Checkout using price_data (dynamic cart)
    const stripeLineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          ...(item.product.image_url ? { images: [item.product.image_url] } : {}),
        },
        unit_amount: Math.round(item.product.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const origin = req.headers.get("origin") || "https://squadmedicalsupplies.lovable.app";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${origin}/payment-success?order_id=${order.id}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        order_id: order.id,
        user_id: user.id,
      },
    });

    // Clear cart
    await serviceClient.from("cart_items").delete().eq("user_id", user.id);

    return new Response(
      JSON.stringify({ url: session.url, order_id: order.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Checkout error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
