import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Truck, ShieldCheck, FileText, Minus, Plus, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ProductReviews from "@/components/ProductReviews";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Product not found</h1>
          <Link to="/equipment" className="mt-4 inline-block text-primary hover:underline">← Back to Equipment</Link>
        </div>
      </Layout>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(
      product.id,
      quantity,
      product.colors?.[selectedColor],
      product.sizes?.[selectedSize]
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <Link to="/equipment" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Equipment
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-2xl bg-muted">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-foreground">{product.name}</h1>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-foreground">${product.price.toLocaleString()}.00</span>
              {product.originalPrice && <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toLocaleString()}.00</span>}
              {discount > 0 && <span className="rounded-md bg-badge-sale px-2 py-0.5 text-xs font-semibold text-primary-foreground">{discount}% OFF</span>}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Clinical Info */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "HCPCS Code", value: product.hcpcsCode },
                { label: "FDA Class", value: product.fdaClass },
                { label: "Warranty", value: product.warrantyType },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-secondary p-3">
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                  <p className="font-display text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-foreground">Color: {product.colors[selectedColor]}</p>
                <div className="flex gap-2">
                  {product.colors.map((color, i) => (
                    <button key={color} onClick={() => setSelectedColor(i)}
                      className={`rounded-lg border px-4 py-2 text-sm transition-colors ${selectedColor === i ? "border-primary bg-primary/5 font-medium text-primary" : "border-border text-muted-foreground hover:border-foreground"}`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-foreground">Size: {product.sizes[selectedSize]}</p>
                <div className="flex gap-2">
                  {product.sizes.map((size, i) => (
                    <button key={size} onClick={() => setSelectedSize(i)}
                      className={`rounded-lg border px-4 py-2 text-sm transition-colors ${selectedSize === i ? "border-primary bg-primary/5 font-medium text-primary" : "border-border text-muted-foreground hover:border-foreground"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-foreground">Quantity</p>
              <div className="inline-flex items-center rounded-lg border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
                <span className="min-w-[40px] text-center text-sm font-medium text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <button onClick={handleAddToCart} className="rounded-lg bg-foreground px-6 py-3.5 font-display text-sm font-semibold text-background transition-opacity hover:opacity-90">
                Add to Cart
              </button>
              <Link to="/checkout" onClick={handleAddToCart} className="rounded-lg border border-border px-6 py-3.5 text-center font-display text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
                Buy it Now
              </Link>
            </div>

            {/* Prescription Warning */}
            {product.isPrescriptionRequired && (
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Prescription Required</p>
                  <p className="text-xs text-muted-foreground">A valid prescription will be required during checkout.</p>
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>
                  {product.shippingClass === "standard" && "Free shipping on orders over $100"}
                  {product.shippingClass === "ltl-freight" && "LTL Freight shipping — delivery scheduled with you"}
                  {product.shippingClass === "white-glove" && "White-Glove delivery — setup included"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>{product.warrantyType} warranty included</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </div>
    </Layout>
  );
};

export default ProductDetail;
