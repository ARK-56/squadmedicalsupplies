import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Post Not Found</h1>
          <p className="mt-4 text-muted-foreground">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">{post.category}</span>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <img src={post.image} alt={post.title} className="mb-8 w-full rounded-xl object-cover" />
            <div className="prose prose-lg max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-ul:text-muted-foreground">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="mb-4 mt-8 text-2xl font-bold">{paragraph.replace("## ", "")}</h2>;
                }
                if (paragraph.startsWith("### ")) {
                  return <h3 key={i} className="mb-3 mt-6 text-xl font-semibold">{paragraph.replace("### ", "")}</h3>;
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ul key={i} className="mb-4 list-disc space-y-2 pl-6">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ul>
                  );
                }
                if (/^\d+\./.test(paragraph)) {
                  const items = paragraph.split("\n").filter(Boolean);
                  return (
                    <ol key={i} className="mb-4 list-decimal space-y-2 pl-6">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                      ))}
                    </ol>
                  );
                }
                return <p key={i} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />;
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default BlogPost;
