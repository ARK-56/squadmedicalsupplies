import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/equipment/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {product.isPrescriptionRequired && (
          <span className="absolute right-3 top-3 rounded-md bg-primary/90 px-2 py-1 text-[10px] font-semibold text-primary-foreground">
            Rx Required
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <h3 className="font-display text-sm font-semibold text-foreground">{product.name}</h3>
        <p className="text-xs text-muted-foreground">HCPCS: {product.hcpcsCode}</p>
        <p className="mt-auto pt-2 text-xs font-medium text-primary">View Details →</p>
      </div>
    </Link>
  );
};

export default ProductCard;
