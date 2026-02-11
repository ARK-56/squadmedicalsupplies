import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto px-4 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>

            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">
              Welcome to Squad Medical
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Medical Equipment{" "}
              <span className="text-primary">For Your Needs</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Premium durable medical equipment delivered with care. From wheelchairs to respiratory devices, we provide FDA-certified products with professional guidance.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/equipment"
                className="rounded-lg bg-primary px-7 py-3.5 font-display text-sm font-semibold text-primary-foreground shadow-elevated transition-all hover:opacity-90">

                Browse Equipment
              </Link>
              <a
                href="#how-it-works"
                className="rounded-lg border border-border bg-card px-7 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-secondary">

                How It Works
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>FDA Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span>Free Shipping 100+</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative">

            <div className="overflow-hidden rounded-2xl shadow-elevated">
              <img

                alt="Premium medical equipment - wheelchair and hospital bed in clinical setting"
                className="h-full w-full object-cover"
                fetchPriority="high"
                decoding="async" src="/lovable-uploads/3ee289f9-312a-46af-8bdb-4054f74b2912.webp" />

            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-4 shadow-card-hover">
              <p className="font-display text-2xl font-bold text-primary">260k+</p>
              <p className="text-xs text-muted-foreground">Satisfied Patients</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default HeroSection;