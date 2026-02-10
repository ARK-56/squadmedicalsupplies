import { motion } from "framer-motion";
import { ShieldCheck, Truck, ClipboardCheck, Monitor, HeartPulse } from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Simple, Seamless Process",
    description: "Purchase your DME equipment online and schedule delivery in minutes — fast, easy, and secure.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Standard shipping or white-glove delivery for heavy equipment — we handle the logistics.",
  },
  {
    icon: ShieldCheck,
    title: "FDA Certified Products",
    description: "Every product meets FDA classification standards with proper HCPCS coding for insurance claims.",
  },
  {
    icon: Monitor,
    title: "Digital Order Tracking",
    description: "Track your order in real-time from warehouse to doorstep with full visibility.",
  },
  {
    icon: HeartPulse,
    title: "Designed for Patient Care",
    description: "Equipment selected with patient comfort and clinical efficacy as top priorities.",
  },
];

const InfoCards = () => {
  return (
    <section id="how-it-works" className="bg-card py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Why Squad Medical
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Smarter Health Equipment
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-sm font-semibold text-foreground">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
