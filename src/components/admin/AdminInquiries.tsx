import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, MessageSquare, Trash2, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  medicare_id: string;
  dob_month: number;
  dob_day: number;
  dob_year: number;
  zip_code: string;
  message: string | null;
  product_id: string | null;
  product_name: string | null;
  status: string;
  created_at: string;
  prescription_url: string | null;
}

const ITEMS_PER_PAGE = 10;

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    setInquiries((data as Inquiry[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchInquiries(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("inquiries").update({ status } as any).eq("id", id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = async (id: string) => {
    await supabase.from("inquiries").delete().eq("id", id);
    setInquiries(prev => prev.filter(i => i.id !== id));
    if (expanded === id) setExpanded(null);
  };

  const statuses = ["All", "new", "contacted", "resolved"];

  const filtered = inquiries.filter(i => {
    if (statusFilter !== "All" && i.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (`${i.first_name} ${i.last_name}`.toLowerCase().includes(q) ||
        i.phone.includes(q) || i.medicare_id.toLowerCase().includes(q) ||
        i.product_name?.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const statusColor = (s: string) => {
    if (s === "new") return "text-yellow-600";
    if (s === "contacted") return "text-blue-600";
    if (s === "resolved") return "text-green-600";
    return "text-foreground";
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading inquiries...</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search inquiries..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
          {statuses.map(s => <option key={s} value={s}>{s === "All" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <span className="text-xs text-muted-foreground">{filtered.length} inquiries</span>
      </div>

      <div className="space-y-3">
        {paginated.map(i => (
          <div key={i.id} className="rounded-lg border border-border bg-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === i.id ? null : i.id)}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {i.first_name} {i.last_name}
                    {i.product_name && <span className="ml-2 text-xs font-normal text-muted-foreground">· {i.product_name}</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(i.created_at).toLocaleDateString()} · {i.phone} ·{" "}
                    <span className={`font-semibold ${statusColor(i.status)}`}>{i.status}</span>
                  </p>
                </div>
              </div>
              {expanded === i.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
            {expanded === i.id && (
              <div className="border-t border-border bg-secondary/10 p-4">
                <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <div><p className="text-xs text-muted-foreground">Address</p><p className="text-foreground">{i.address}</p></div>
                  <div><p className="text-xs text-muted-foreground">Medicare ID</p><p className="text-foreground">{i.medicare_id}</p></div>
                  <div><p className="text-xs text-muted-foreground">Date of Birth</p><p className="text-foreground">{i.dob_month}/{i.dob_day}/{i.dob_year}</p></div>
                  <div><p className="text-xs text-muted-foreground">Zip Code</p><p className="text-foreground">{i.zip_code}</p></div>
                  <div><p className="text-xs text-muted-foreground">Phone</p><p className="text-foreground">{i.phone}</p></div>
                  {i.product_name && <div><p className="text-xs text-muted-foreground">Product</p><p className="text-foreground">{i.product_name}</p></div>}
                </div>
                {i.message && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground">Message</p>
                    <p className="text-sm text-foreground">{i.message}</p>
                  </div>
                )}
                {i.prescription_url && (
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-1">Prescription (RX)</p>
                    <button
                      onClick={async () => {
                        const { data } = await supabase.storage.from("prescriptions").createSignedUrl(i.prescription_url!, 3600);
                        if (data?.signedUrl) window.open(data.signedUrl, "_blank");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      View Prescription
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground mr-1">Status:</span>
                  {["new", "contacted", "resolved"].map(s => (
                    <button key={s} onClick={() => updateStatus(i.id, s)}
                      className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${i.status === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                  <button onClick={() => deleteInquiry(i.id)}
                    className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No inquiries found.</p>}
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

export default AdminInquiries;
