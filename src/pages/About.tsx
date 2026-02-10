import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { ShieldCheck, Truck, HeartHandshake, Award } from "lucide-react";
import logo from "@/assets/logo.png";

const values = [
  { icon: ShieldCheck, title: "Quality Assurance", description: "Every product in our catalog is FDA-certified and rigorously tested to meet the highest standards of safety and reliability." },
  { icon: Truck, title: "Reliable Delivery", description: "From standard shipping to white-glove delivery, we ensure your equipment arrives safely and on time, every time." },
  { icon: HeartHandshake, title: "Patient-First Approach", description: "We work closely with healthcare providers and patients to deliver personalized equipment solutions." },
  { icon: Award, title: "Industry Expertise", description: "With decades of combined experience in DME, our team provides expert guidance on product selection and compliance." },
];

const stats = [
  { value: "260K+", label: "Patients Served" },
  { value: "500+", label: "Healthcare Partners" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Customer Support" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <img src={logo} alt="Squad Medical Supplies" className="mx-auto mb-6 h-16 w-auto" />
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">About Squad Medical Supplies</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Your trusted partner in durable medical equipment, committed to improving lives through quality healthcare solutions.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Our Mission</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Empowering Independence Through Quality Medical Equipment</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At Squad Medical Supplies, we believe everyone deserves access to high-quality durable medical equipment. We partner with leading manufacturers and healthcare providers to deliver FDA-certified products that improve mobility, comfort, and quality of life for patients across the nation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Our Values</span>
            <h2 className="font-display text-3xl font-bold text-foreground">What Sets Us Apart</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <v.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
