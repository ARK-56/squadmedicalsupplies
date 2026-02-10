import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Right Wheelchair for Your Needs",
    excerpt: "A comprehensive guide to selecting the perfect wheelchair based on lifestyle, mobility level, and insurance coverage.",
    image: blog1,
    date: "Jan 15, 2026",
    category: "Buying Guides",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Understanding CPAP Therapy: A Patient's Guide",
    excerpt: "Everything you need to know about CPAP machines, from setup to maintenance, and how to maximize your sleep therapy.",
    image: blog2,
    date: "Jan 8, 2026",
    category: "Patient Education",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Medicare Coverage for DME: What's Covered in 2026",
    excerpt: "Navigate the complexities of Medicare Part B coverage for durable medical equipment, including recent policy updates.",
    image: blog3,
    date: "Dec 28, 2025",
    category: "Insurance",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "Home Safety Modifications for Fall Prevention",
    excerpt: "Practical tips and equipment recommendations to make your home safer and reduce the risk of falls for seniors.",
    image: blog1,
    date: "Dec 20, 2025",
    category: "Safety Tips",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "The Benefits of Portable Oxygen Concentrators",
    excerpt: "How modern portable oxygen concentrators are giving patients the freedom to travel and maintain active lifestyles.",
    image: blog2,
    date: "Dec 12, 2025",
    category: "Product Spotlight",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "Caregiver's Guide to Hospital Bed Setup at Home",
    excerpt: "Step-by-step instructions for setting up and maintaining a hospital bed in a home environment.",
    image: blog3,
    date: "Dec 5, 2025",
    category: "Caregiver Resources",
    readTime: "6 min read",
  },
];

const Blog = () => {
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

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase text-primary">{post.category}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Blog;
