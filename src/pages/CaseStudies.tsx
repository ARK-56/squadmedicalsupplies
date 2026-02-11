import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { caseStudies } from "@/data/caseStudies";

const categories = ["All", ...Array.from(new Set(caseStudies.map((s) => s.category)))];

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = caseStudies;
    if (selectedCategory !== "All") result = result.filter((s) => s.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((s) => s.title.toLowerCase().includes(q) || s.client.toLowerCase().includes(q) || s.challenge.toLowerCase().includes(q));
    }
    return result;
  }, [selectedCategory, searchQuery]);

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

      {/* Search + Filter */}
      <section className="border-b border-border bg-card py-4">
        <div className="container mx-auto flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search case studies..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16">
        <div className="container mx-auto space-y-12 px-4 lg:px-8">
          {filtered.map((study, i) => (
            <motion.div key={study.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
              <Link to={`/case-studies/${study.id}`} className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover">
                <div className="grid md:grid-cols-3">
                  <div className="flex flex-col justify-center border-b border-border bg-secondary/30 p-6 md:border-b-0 md:border-r md:p-8">
                    <study.icon className="mb-4 h-10 w-10 text-primary" />
                    <span className="mb-2 text-xs font-semibold uppercase text-primary">{study.category}</span>
                    <h3 className="font-display text-lg font-bold text-foreground md:text-xl">{study.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{study.client}</p>
                  </div>
                  <div className="col-span-2 space-y-4 p-6 md:space-y-6 md:p-8">
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
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />{r}
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
          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">No case studies match your search.</div>
          )}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default CaseStudies;
