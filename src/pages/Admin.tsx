import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminNewsletter from "@/components/admin/AdminNewsletter";
import AdminInquiries from "@/components/admin/AdminInquiries";

interface DBProduct {
  id: string; name: string; price: number; original_price: number | null;
  image_url: string | null; category: string; hcpcs_code: string; fda_class: string;
  is_prescription_required: boolean; shipping_class: string; warranty_type: string;
  in_stock: boolean; description: string; is_sale: boolean | null;
  colors: string[] | null; sizes: string[] | null;
}

interface DBReview {
  id: string; rating: number; comment: string;
  display_name: string | null; created_at: string; product_id: string;
}

const tabs = [
  { key: "products", label: "Products" },
  { key: "inquiries", label: "Inquiries" },
  { key: "reviews", label: "Reviews" },
  { key: "orders", label: "Orders" },
  { key: "newsletter", label: "Newsletter" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<TabKey>("products");
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [reviews, setReviews] = useState<DBReview[]>([]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts((data as DBProduct[]) || []);
  };

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    setReviews((data as DBReview[]) || []);
  };

  useEffect(() => { fetchProducts(); fetchReviews(); }, []);

  if (authLoading) return <Layout><div className="flex items-center justify-center py-20"><p>Loading...</p></div></Layout>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mb-8 text-muted-foreground">Manage products, reviews, orders, and newsletter subscribers</p>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "products" && <AdminProducts products={products} onRefresh={fetchProducts} />}
        {tab === "inquiries" && <AdminInquiries />}
        {tab === "reviews" && <AdminReviews reviews={reviews} products={products} onRefresh={fetchReviews} />}
        {tab === "orders" && <AdminOrders />}
        {tab === "newsletter" && <AdminNewsletter />}
      </div>
    </Layout>
  );
};

export default Admin;
