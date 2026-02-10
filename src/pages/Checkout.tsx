import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", city: "", state: "", zip: "" });

  if (!user) return <Navigate to="/auth" replace />;
  if (items.length === 0) return <Navigate to="/equipment" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: totalPrice,
        shipping_name: form.name,
        shipping_address: form.address,
        shipping_city: form.city,
        shipping_state: form.state,
        shipping_zip: form.zip,
      })
      .select()
      .single();

    if (orderError || !order) {
      toast({ title: "Error", description: orderError?.message || "Failed to create order", variant: "destructive" });
      setLoading(false);
      return;
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product?.name || "Product",
      quantity: item.quantity,
      price_at_purchase: item.product?.price || 0,
    }));

    await supabase.from("order_items").insert(orderItems);
    await clearCart();
    toast({ title: "Order placed!", description: `Order #${order.id.slice(0, 8)} has been placed successfully.` });
    navigate("/");
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-5 rounded-xl border border-border bg-card p-8"
          >
            <h2 className="font-display text-lg font-semibold text-foreground">Shipping Information</h2>
            {[
              { label: "Full Name", key: "name", placeholder: "John Doe" },
              { label: "Address", key: "address", placeholder: "123 Main St" },
              { label: "City", key: "city", placeholder: "Dallas" },
              { label: "State", key: "state", placeholder: "TX" },
              { label: "ZIP Code", key: "zip", placeholder: "75201" },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
                <input
                  required type="text"
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={placeholder}
                />
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-primary py-3.5 font-display text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
              {loading ? "Placing Order..." : `Place Order — $${totalPrice.toLocaleString()}.00`}
            </button>
          </motion.form>

          {/* Summary */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{item.product?.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-foreground">${((item.product?.price || 0) * item.quantity).toLocaleString()}.00</p>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-display text-xl font-bold text-foreground">${totalPrice.toLocaleString()}.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
