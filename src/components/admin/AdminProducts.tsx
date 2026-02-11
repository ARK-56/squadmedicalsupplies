import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
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

const emptyProduct = {
  name: "", price: 0, original_price: null as number | null, image_url: "",
  category: "", hcpcs_code: "", fda_class: "Class I",
  is_prescription_required: false, shipping_class: "standard",
  warranty_type: "1-Year Limited", in_stock: true, description: "",
  is_sale: false, colors: [] as string[], sizes: [] as string[],
};

const ITEMS_PER_PAGE = 10;

interface Props {
  products: DBProduct[];
  onRefresh: () => void;
}

const AdminProducts = ({ products, onRefresh }: Props) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(1);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filtered = products.filter(p => {
    if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.hcpcs_code.toLowerCase().includes(q);
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const handleAdd = async (e: React.FormEvent) => {
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
    else { toast({ title: "Product added!" }); setForm(emptyProduct); setShowForm(false); onRefresh(); }
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    onRefresh();
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Product
        </button>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="text-xs text-muted-foreground">{filtered.length} products</span>
      </div>

      {showForm && (
        <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          onSubmit={handleAdd} className="mb-8 rounded-xl border border-border bg-card p-6">
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
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
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
        {paginated.map((p) => (
          <div key={p.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              {p.image_url && <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded-md object-cover" loading="lazy" decoding="async" />}
              <div>
                <p className="text-sm font-semibold text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">${p.price} · {p.category} · {p.hcpcs_code}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No products found.</p>}
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

export default AdminProducts;
