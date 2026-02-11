import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const BlogPreview = () => {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">
            Blog
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Discover helpful insights, health tips,<br className="hidden md:block" /> and the science behind our approach
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/blog/${post.id}`}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-muted-foreground">{post.date} · {post.readTime}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-auto pt-4 text-sm font-semibold text-primary">Read article →</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/blog" className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
