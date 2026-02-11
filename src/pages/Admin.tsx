import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Star, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DBProduct {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  category: string;
  hcpcs_code: string;
  fda_class: string;
  is_prescription_required: boolean;
  shipping_class: string;
  warranty_type: string;
  in_stock: boolean;
  description: string;
  is_sale: boolean | null;
  colors: string[] | null;
  sizes: string[] | null;
}

interface DBReview {
  id: string;
  rating: number;
  comment: string;
  display_name: string | null;
  created_at: string;
  product_id: string;
}

const emptyProduct = {
  name: "", price: 0, original_price: null as number | null, image_url: "",
  category: "", hcpcs_code: "", fda_class: "Class I",
  is_prescription_required: false, shipping_class: "standard",
  warranty_type: "1-Year Limited", in_stock: true, description: "",
  is_sale: false, colors: [] as string[], sizes: [] as string[],
};

const emptyReview = {
  product_id: "",
  rating: 5,
  comment: "",
  display_name: "",
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<"products" | "reviews">("products");
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [reviews, setReviews] = useState<DBReview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [reviewForm, setReviewForm] = useState(emptyReview);
  const [submitting, setSubmitting] = useState(false);
  const [reviewSearch, setReviewSearch] = useState("");

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("products").insert({
      name: form.name, price: form.price, original_price: form.original_price || null,
      image_url: form.image_url || null, category: form.category, hcpcs_code: form.hcpcs_code,
      fda_class: form.fda_class, is_prescription_required: form.is_prescription_required,
      shipping_class: form.shipping_class, warranty_type: form.warranty_type,
      in_stock: form.in_stock, description: form.description, is_sale: form.is_sale,
      colors: form.colors.length ? form.colors : null, sizes: form.sizes.length ? form.sizes : null,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Product added!" }); setForm(emptyProduct); setShowForm(false); fetchProducts(); }
    setSubmitting(false);
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.product_id) { toast({ title: "Select a product", variant: "destructive" }); return; }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      product_id: reviewForm.product_id,
      user_id: user.id,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      display_name: reviewForm.display_name || "Admin",
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Review added!" }); setReviewForm(emptyReview); setShowReviewForm(false); fetchReviews(); }
    setSubmitting(false);
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    fetchProducts();
  };

  const deleteReview = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    toast({ title: "Review deleted" });
    fetchReviews();
  };

  const filteredReviews = reviews.filter((r) => {
    if (!reviewSearch) return true;
    const q = reviewSearch.toLowerCase();
    return (r.display_name?.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q));
  });

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || productId.slice(0, 8);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mb-8 text-muted-foreground">Manage products and reviews</p>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {(["products", "reviews"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
              {t === "products" ? "Products" : "Reviews"}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div>
            <button onClick={() => setShowForm(!showForm)} className="mb-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
              <Plus className="h-4 w-4" /> Add Product
            </button>

            {showForm && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                onSubmit={handleAddProduct} className="mb-8 rounded-xl border border-border bg-card p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Name", key: "name", type: "text", required: true },
                    { label: "Price", key: "price", type: "number", required: true },
                    { label: "Original Price", key: "original_price", type: "number" },
                    { label: "Image URL", key: "image_url", type: "text" },
                    { label: "Category", key: "category", type: "text", required: true },
                    { label: "HCPCS Code", key: "hcpcs_code", type: "text" },
                    { label: "FDA Class", key: "fda_class", type: "text" },
                    { label: "Warranty Type", key: "warranty_type", type: "text" },
                    { label: "Description", key: "description", type: "text" },
                  ].map(({ label, key, type, required }) => (
                    <div key={key}>
                      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
                      <input type={type} required={required}
                        value={(form as Record<string, any>)[key] ?? ""}
                        onChange={(e) => setForm({ ...form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Shipping Class</label>
                    <select value={form.shipping_class} onChange={(e) => setForm({ ...form, shipping_class: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                      <option value="standard">Standard</option>
                      <option value="ltl-freight">LTL Freight</option>
                      <option value="white-glove">White Glove</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={form.is_prescription_required} onChange={(e) => setForm({ ...form, is_prescription_required: e.target.checked })} className="accent-primary" />
                      Prescription Required
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="accent-primary" />
                      In Stock
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={form.is_sale || false} onChange={(e) => setForm({ ...form, is_sale: e.target.checked })} className="accent-primary" />
                      On Sale
                    </label>
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50">
                  {submitting ? "Adding..." : "Add Product"}
                </button>
              </motion.form>
            )}

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    {p.image_url && <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded-md object-cover" />}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">${p.price} · {p.category} · {p.hcpcs_code}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              {products.length === 0 && <p className="text-sm text-muted-foreground">No products in database yet.</p>}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <button onClick={() => setShowReviewForm(!showReviewForm)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                <Plus className="h-4 w-4" /> Add Review
              </button>
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text" placeholder="Search reviews..."
                  value={reviewSearch} onChange={(e) => setReviewSearch(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {showReviewForm && (
              <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                onSubmit={handleAddReview} className="mb-8 rounded-xl border border-border bg-card p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Product</label>
                    <select required value={reviewForm.product_id} onChange={(e) => setReviewForm({ ...reviewForm, product_id: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                      <option value="">Select a product...</option>
                      {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Display Name</label>
                    <input type="text" value={reviewForm.display_name} onChange={(e) => setReviewForm({ ...reviewForm, display_name: e.target.value })}
                      placeholder="Reviewer name" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Rating</label>
                    <div className="flex gap-1 py-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: s })}>
                          <Star className={`h-5 w-5 ${s <= reviewForm.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-foreground">Comment</label>
                    <textarea required value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      rows={3} placeholder="Write review comment..."
                      className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="mt-4 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50">
                  {submitting ? "Adding..." : "Add Review"}
                </button>
              </motion.form>
            )}

            <div className="space-y-3">
              {filteredReviews.map((r) => (
                <div key={r.id} className="flex items-start justify-between rounded-lg border border-border bg-card p-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />)}</div>
                      <span className="text-sm font-semibold text-foreground">{r.display_name || "Anonymous"}</span>
                      <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-1 text-xs text-primary">Product: {getProductName(r.product_id)}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                  <button onClick={() => deleteReview(r.id)} className="ml-4 shrink-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              {filteredReviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews found.</p>}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
