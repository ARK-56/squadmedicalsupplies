import { motion } from "framer-motion";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const posts = [
  {
    image: blog1,
    date: "11 Jan 2025 • 5 min read",
    title: "Understanding DME Insurance Coverage",
    excerpt: "Explore how insurance policies cover durable medical equipment and what you need to know.",
  },
  {
    image: blog2,
    date: "11 Jan 2025 • 5 min read",
    title: "Choosing the Right Wheelchair",
    excerpt: "A guide to selecting the perfect wheelchair based on lifestyle, mobility needs, and comfort.",
  },
  {
    image: blog3,
    date: "11 Jan 2025 • 5 min read",
    title: "Home Safety for Elderly Patients",
    excerpt: "Discover essential medical equipment that makes home living safer and more comfortable.",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Blog
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Discover helpful insights, health tips,<br className="hidden md:block" /> and the science behind our approach
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground">{post.date}</p>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-sm font-semibold text-primary">Read article →</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
