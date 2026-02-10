import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative rounded-md p-2 text-foreground hover:bg-secondary" aria-label="Cart">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display">Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {!user ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">Sign in to view your cart</p>
            <Link to="/auth" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Sign In</Link>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <Link to="/equipment" className="text-sm font-semibold text-primary hover:underline">Browse Equipment</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-lg border border-border p-3">
                  {item.product?.image_url && (
                    <img src={item.product.image_url} alt={item.product?.name} className="h-16 w-16 rounded-md object-cover" />
                  )}
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-foreground">{item.product?.name}</p>
                    {(item.selected_color || item.selected_size) && (
                      <p className="text-xs text-muted-foreground">{[item.selected_color, item.selected_size].filter(Boolean).join(" / ")}</p>
                    )}
                    <p className="text-sm font-bold text-foreground">${item.product?.price?.toLocaleString()}.00</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded border border-border p-1 hover:bg-secondary"><Minus className="h-3 w-3" /></button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded border border-border p-1 hover:bg-secondary"><Plus className="h-3 w-3" /></button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="font-display text-xl font-bold text-foreground">${totalPrice.toLocaleString()}.00</span>
              </div>
              <Link to="/checkout" className="block w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
