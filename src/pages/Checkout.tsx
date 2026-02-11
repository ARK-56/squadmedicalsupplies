import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const MAX_NAME = 100;
const MAX_ADDRESS = 200;
const MAX_CITY = 100;
const ZIP_REGEX = /^\d{5}(-\d{4})?$/;
const STATE_REGEX = /^[A-Za-z]{2}$/;

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", city: "", state: "", zip: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!user) return <Navigate to="/auth" replace />;
  if (items.length === 0) return <Navigate to="/equipment" replace />;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    else if (form.name.length > MAX_NAME) errors.name = `Max ${MAX_NAME} characters`;

    if (!form.address.trim()) errors.address = "Address is required";
    else if (form.address.length > MAX_ADDRESS) errors.address = `Max ${MAX_ADDRESS} characters`;

    if (!form.city.trim()) errors.city = "City is required";
    else if (form.city.length > MAX_CITY) errors.city = `Max ${MAX_CITY} characters`;

    if (!form.state.trim()) errors.state = "State is required";
    else if (!STATE_REGEX.test(form.state.trim())) errors.state = "Use 2-letter state code";

    if (!form.zip.trim()) errors.zip = "ZIP code is required";
    else if (!ZIP_REGEX.test(form.zip.trim())) errors.zip = "Invalid ZIP (e.g. 75201)";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const res = await supabase.functions.invoke("create-checkout", {
        body: {
          shipping_name: form.name.trim(),
          shipping_address: form.address.trim(),
          shipping_city: form.city.trim(),
          shipping_state: form.state.trim().toUpperCase(),
          shipping_zip: form.zip.trim(),
        },
      });

      if (res.error || res.data?.error) {
        const msg = res.data?.details?.join(", ") || res.data?.error || res.error?.message || "Order failed";
        toast({ title: "Error", description: msg, variant: "destructive" });
        setLoading(false);
        return;
      }

      // Clear local cart state and redirect to Stripe
      await clearCart();
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Full Name", key: "name", placeholder: "John Doe", max: MAX_NAME },
    { label: "Address", key: "address", placeholder: "123 Main St", max: MAX_ADDRESS },
    { label: "City", key: "city", placeholder: "Dallas", max: MAX_CITY },
    { label: "State", key: "state", placeholder: "TX", max: 2 },
    { label: "ZIP Code", key: "zip", placeholder: "75201", max: 10 },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Checkout</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <motion.form
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-5 rounded-xl border border-border bg-card p-8"
          >
            <h2 className="font-display text-lg font-semibold text-foreground">Shipping Information</h2>
            {fields.map(({ label, key, placeholder, max }) => (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
                <input
                  required type="text"
                  maxLength={max}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => {
                    setForm({ ...form, [key]: e.target.value });
                    if (fieldErrors[key]) setFieldErrors({ ...fieldErrors, [key]: "" });
                  }}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground bg-background focus:outline-none focus:ring-1 ${
                    fieldErrors[key] ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border focus:border-primary focus:ring-primary"
                  }`}
                  placeholder={placeholder}
                />
                {fieldErrors[key] && <p className="mt-1 text-xs text-destructive">{fieldErrors[key]}</p>}
              </div>
            ))}
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-primary py-3.5 font-display text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
              {loading ? "Redirecting to Payment..." : `Pay — $${totalPrice.toLocaleString()}.00`}
            </button>
          </motion.form>

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
