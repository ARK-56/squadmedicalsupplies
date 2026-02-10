import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContactDialog from "@/components/ContactDialog";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-12 text-center md:p-20"
          style={{ background: "var(--gradient-cta)" }}
        >
          {/* Avatars */}
          <div className="mb-4 flex items-center justify-center -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-primary/20 text-xs font-semibold text-primary">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="ml-3 text-sm font-semibold text-primary">260k+ Satisfied Patients</div>
          </div>

          <h2 className="font-display text-3xl font-bold text-foreground md:text-5xl">
            Trustworthy Care for You<br />and Your Family
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Comprehensive, compassionate healthcare services designed to support your family's well-being at every stage of life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/equipment" className="rounded-lg bg-primary px-7 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:opacity-90">
              Browse Equipment ↗
            </Link>
            <ContactDialog>
              <button className="rounded-lg border border-border bg-card px-7 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-secondary">
                Contact Us ↗
              </button>
            </ContactDialog>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
