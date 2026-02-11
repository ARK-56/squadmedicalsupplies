import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface DBProduct { id: string; name: string; }
interface DBReview {
  id: string; rating: number; comment: string;
  display_name: string | null; created_at: string; product_id: string;
}

const ITEMS_PER_PAGE = 10;

interface Props {
  reviews: DBReview[];
  products: DBProduct[];
  onRefresh: () => void;
}

const AdminReviews = ({ reviews, products, onRefresh }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ product_id: "", rating: 5, comment: "", display_name: "" });
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = reviews.filter(r => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (r.display_name?.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q));
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const getProductName = (pid: string) => products.find(p => p.id === pid)?.name || pid.slice(0, 8);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product_id) { toast({ title: "Select a product", variant: "destructive" }); return; }
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      product_id: form.product_id, user_id: user.id,
      rating: form.rating, comment: form.comment,
      display_name: form.display_name || "Admin",
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Review added!" }); setForm({ product_id: "", rating: 5, comment: "", display_name: "" }); setShowForm(false); onRefresh(); }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("reviews").delete().eq("id", id);
    toast({ title: "Review deleted" });
    onRefresh();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Review
        </button>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search reviews..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} reviews</span>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleAdd} className="mb-8 rounded-xl border border-border bg-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Product</label>
              <select required value={form.product_id} onChange={(e) => setForm({ ...form, product_id: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
                <option value="">Select a product...</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Display Name</label>
              <input type="text" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                placeholder="Reviewer name" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Rating</label>
              <div className="flex gap-1 py-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button" onClick={() => setForm({ ...form, rating: s })}>
                    <Star className={`h-5 w-5 ${s <= form.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-foreground">Comment</label>
              <textarea required value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })}
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
        {paginated.map(r => (
          <div key={r.id} className="flex items-start justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex">{[1, 2, 3, 4, 5].map(s => <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />)}</div>
                <span className="text-sm font-semibold text-foreground">{r.display_name || "Anonymous"}</span>
                <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              <p className="mt-1 text-xs text-primary">Product: {getProductName(r.product_id)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>
            </div>
            <button onClick={() => handleDelete(r.id)} className="ml-4 shrink-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No reviews found.</p>}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button onClick={() => setPage(Math.max(1, safePage - 1))} disabled={safePage === 1}
            className="rounded-md border border-border p-2 text-muted-foreground hover:bg-secondary disabled:opacity-30">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-muted-foreground">Page {safePage} of {totalPages}</span>
          <button onClick={() => setPage(Math.min(totalPages, safePage + 1))} disabled={safePage === totalPages}
            className="rounded-md border border-border p-2 text-muted-foreground hover:bg-secondary disabled:opacity-30">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
