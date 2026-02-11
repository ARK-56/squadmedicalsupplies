import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = blogPosts;
    if (selectedCategory !== "All") result = result.filter((p) => p.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q));
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  // Reset page on filter change
  useMemo(() => setCurrentPage(1), [selectedCategory, searchQuery]);

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Blog</span>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Insights & Resources</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Expert advice, product guides, and the latest in durable medical equipment</p>
        </div>
      </section>

      {/* Search + Category Filter */}
      <section className="border-b border-border bg-card py-4">
        <div className="container mx-auto flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text" placeholder="Search articles..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filtered.length > 0 ? (safePage - 1) * POSTS_PER_PAGE + 1 : 0}–{Math.min(safePage * POSTS_PER_PAGE, filtered.length)} of {filtered.length} articles
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/blog/${post.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase text-primary">{post.category}</span>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    <span className="mt-auto pt-4 text-sm font-semibold text-primary">Read More →</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No articles found. Try a different search or category.</div>
          )}

          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                      className={safePage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink isActive={safePage === i + 1} onClick={() => setCurrentPage(i + 1)} className="cursor-pointer">
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
                      className={safePage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Blog;
