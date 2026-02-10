import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Equipment = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [selectedCategory, priceRange, inStockOnly, sortBy]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">DME Equipment</h1>
          <p className="mt-1 text-muted-foreground">Browse our full catalog of FDA-certified durable medical equipment</p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-card p-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <span className="text-sm text-muted-foreground">{filtered.length} Products</span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden shrink-0 lg:block"
              style={{ width: 240 }}
            >
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Product Type</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat)}
                          className="accent-primary"
                        />
                        <span className={selectedCategory === cat ? "font-medium text-foreground" : "text-muted-foreground"}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Price</h3>
                  <input
                    type="range"
                    min={0}
                    max={5000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>$0</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Availability</h3>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-primary"
                    />
                    <span className="text-muted-foreground">In Stock</span>
                  </label>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Grid */}
          <div className="flex-1">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                No products match your filters. Try adjusting your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Equipment;
