import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { ShieldCheck, TrendingUp, Users, Heart } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    title: "Regional Hospital Reduces Equipment Costs by 35%",
    client: "St. Mary's Regional Medical Center",
    icon: TrendingUp,
    challenge: "High equipment procurement costs and inconsistent supply chain management across multiple departments.",
    solution: "Partnered with Squad Medical to consolidate DME purchasing, implement inventory tracking, and negotiate volume-based pricing.",
    results: ["35% reduction in equipment costs", "98% on-time delivery rate", "Streamlined procurement across 12 departments"],
    category: "Healthcare System",
  },
  {
    id: 2,
    title: "Home Health Agency Improves Patient Satisfaction to 96%",
    client: "CareFirst Home Health Services",
    icon: Heart,
    challenge: "Patients reported delays in receiving essential mobility and respiratory equipment after hospital discharge.",
    solution: "Established a same-day delivery program and dedicated account management for seamless discharge coordination.",
    results: ["96% patient satisfaction score", "Same-day delivery for 89% of orders", "40% reduction in readmissions"],
    category: "Home Health",
  },
  {
    id: 3,
    title: "Senior Living Facility Achieves Full Compliance",
    client: "Harmony Senior Living Communities",
    icon: ShieldCheck,
    challenge: "Aging equipment fleet failing to meet updated regulatory standards across 5 facility locations.",
    solution: "Complete equipment audit, replacement program, and ongoing compliance monitoring with preventive maintenance scheduling.",
    results: ["100% regulatory compliance", "Zero citation findings in 2 years", "Preventive maintenance program covering 500+ devices"],
    category: "Senior Living",
  },
  {
    id: 4,
    title: "Rehabilitation Center Expands Capacity by 50%",
    client: "Pacific Coast Rehabilitation",
    icon: Users,
    challenge: "Growing patient demand required rapid expansion of therapy equipment and mobility devices.",
    solution: "Custom equipment leasing program with flexible terms, training support, and dedicated clinical consultation.",
    results: ["50% increase in patient capacity", "Custom leasing saved $200K annually", "Staff trained on 30+ new devices"],
    category: "Rehabilitation",
  },
];

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
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
            >
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default CaseStudies;
