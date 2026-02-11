import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { caseStudies } from "@/data/caseStudies";

const CaseStudies = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Case Studies</span>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">Success Stories</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">See how healthcare organizations partner with Squad Medical to improve patient outcomes and reduce costs</p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16">
        <div className="container mx-auto space-y-12 px-4 lg:px-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={`/case-studies/${study.id}`} className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover">
                <div className="grid md:grid-cols-3">
                  {/* Left */}
                  <div className="flex flex-col justify-center border-b border-border bg-secondary/30 p-8 md:border-b-0 md:border-r">
                    <study.icon className="mb-4 h-10 w-10 text-primary" />
                    <span className="mb-2 text-xs font-semibold uppercase text-primary">{study.category}</span>
                    <h3 className="font-display text-xl font-bold text-foreground">{study.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{study.client}</p>
                  </div>

                  {/* Right */}
                  <div className="col-span-2 space-y-6 p-8">
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Challenge</h4>
                      <p className="text-sm text-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Solution</h4>
                      <p className="text-sm text-foreground">{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">Results</h4>
                      <ul className="space-y-1.5">
                        {study.results.map((r, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="inline-block text-sm font-semibold text-primary group-hover:underline">Read Full Case Study →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default CaseStudies;
