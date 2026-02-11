import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Quote } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { caseStudies } from "@/data/caseStudies";

const CaseStudyDetail = () => {
  const { id } = useParams();
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Case Study Not Found</h1>
          <p className="mt-4 text-muted-foreground">The case study you're looking for doesn't exist.</p>
          <Link to="/case-studies" className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Back to Case Studies
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = study.icon;

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/case-studies" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Case Studies
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-4 flex items-center gap-3">
              <Icon className="h-10 w-10 text-primary" />
              <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">{study.category}</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{study.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{study.client}</p>
          </motion.div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="border-b border-border py-10">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3 lg:px-8">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Challenge</h3>
            <p className="text-sm text-foreground">{study.challenge}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Solution</h3>
            <p className="text-sm text-foreground">{study.solution}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Key Results</h3>
            <ul className="space-y-1.5">
              {study.results.map((r, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full Story */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Full Story</h2>
            {study.fullStory.split("\n\n").map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">{p}</p>
            ))}

            {study.testimonial && (
              <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-8">
                <Quote className="mb-4 h-8 w-8 text-primary/40" />
                <blockquote className="mb-4 font-display text-lg font-medium italic text-foreground">
                  "{study.testimonial.quote}"
                </blockquote>
                <p className="text-sm font-semibold text-foreground">{study.testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{study.testimonial.title}, {study.client}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default CaseStudyDetail;
