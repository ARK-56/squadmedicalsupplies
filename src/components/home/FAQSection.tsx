import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    q: "What is Squad Medical Supplies?",
    a: "Squad Medical Supplies is a trusted provider of durable medical equipment (DME), offering FDA-certified products from wheelchairs and hospital beds to respiratory devices. We provide a seamless online purchasing experience with professional support.",
  },
  {
    q: "How does the ordering process work?",
    a: "Browse our equipment catalog, add items to your cart, and check out securely. For prescription-required items, you'll upload your prescription during checkout. We handle insurance verification and ship directly to your door.",
  },
  {
    q: "Do I need a prescription for all products?",
    a: "Not all products require a prescription. Items like wheelchairs and walkers can be purchased directly. However, items such as CPAP machines, hospital beds, and oxygen concentrators require a valid prescription from your healthcare provider.",
  },
  {
    q: "Is my order covered by insurance?",
    a: "Many DME products are covered by Medicare, Medicaid, and private insurance plans. Our team can help verify your coverage and assist with the claims process. HCPCS codes are provided for all eligible products.",
  },
  {
    q: "How secure is my data?",
    a: "We employ bank-grade encryption and are fully HIPAA compliant. All medical documents are stored in encrypted storage and your personal health information is never shared with third parties without your explicit consent.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-card py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              FAQs
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Have questions?<br />We're here to help.
            </h2>
            <button className="mt-6 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">
              View all FAQs
            </button>
          </div>

          {/* Right */}
          <div className="divide-y divide-border">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="pr-4 font-display text-sm font-semibold text-foreground">{faq.q}</span>
                  {open === i ? (
                    <X className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
