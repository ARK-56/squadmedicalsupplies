import { motion } from "framer-motion";
import { ShieldCheck, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import privacyImage from "@/assets/privacy-section.jpg";

const PrivacySection = () => {
  return (
    <section className="bg-card py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">
              Privacy
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Your Data is Our{" "}
              <span className="text-primary">Top Priority</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              At Squad Medical, we prioritize your privacy and security. Our platform employs advanced encryption and strict data protection protocols to safeguard your information.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                { icon: ShieldCheck, text: "Your health data stays private" },
                { icon: Globe, text: "We comply with HIPAA and global privacy standards" },
                { icon: Lock, text: "You can trust Squad Medical to safeguard your information" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{text}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                src={privacyImage}
                alt="Healthcare professional ensuring patient data privacy"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;
