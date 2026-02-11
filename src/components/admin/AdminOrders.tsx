import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_name: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  created_at: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  quantity: number;
  price_at_purchase: number;
}

const ITEMS_PER_PAGE = 10;

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const fetchItems = async (orderId: string) => {
    if (orderItems[orderId]) return;
    const { data } = await supabase.from("order_items").select("*").eq("order_id", orderId);
    setOrderItems(prev => ({ ...prev, [orderId]: (data as OrderItem[]) || [] }));
  };

  const toggleExpand = (orderId: string) => {
    if (expandedOrder === orderId) { setExpandedOrder(null); return; }
    setExpandedOrder(orderId);
    fetchItems(orderId);
  };

  const statuses = ["All", ...Array.from(new Set(orders.map(o => o.status)))];

  const filtered = orders.filter(o => {
    if (statusFilter !== "All" && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (o.shipping_name?.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) ||
        o.shipping_city?.toLowerCase().includes(q) || o.shipping_state?.toLowerCase().includes(q));
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  if (loading) return <p className="text-sm text-muted-foreground">Loading orders...</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search orders..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-xs text-muted-foreground">{filtered.length} orders</span>
      </div>

      <div className="space-y-3">
        {paginated.map(o => (
          <div key={o.id} className="rounded-lg border border-border bg-card overflow-hidden">
            <button onClick={() => toggleExpand(o.id)} className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">#{o.id.slice(0, 8)} · {o.shipping_name || "N/A"}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString()} · ${o.total_amount.toLocaleString()} ·{" "}
                    <span className={`font-semibold ${o.status === "pending" ? "text-yellow-600" : o.status === "completed" ? "text-green-600" : "text-foreground"}`}>
                      {o.status}
                    </span>
                  </p>
                </div>
              </div>
              {expandedOrder === o.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
            {expandedOrder === o.id && (
              <div className="border-t border-border bg-secondary/10 p-4">
                <div className="grid gap-2 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Shipping Address</p>
                    <p className="text-foreground">{o.shipping_address}, {o.shipping_city}, {o.shipping_state} {o.shipping_zip}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Order ID</p>
                    <p className="text-foreground font-mono text-xs">{o.id}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">ITEMS</p>
                  {orderItems[o.id] ? (
                    <div className="space-y-1">
                      {orderItems[o.id].map(item => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{item.product_name} × {item.quantity}</span>
                          <span className="font-semibold text-foreground">${(item.price_at_purchase * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Loading items...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No orders found.</p>}
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

export default AdminOrders;
