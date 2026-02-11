import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CTASection from "@/components/home/CTASection";
import { ShieldCheck, Truck, HeartHandshake, Award, Target, Lightbulb, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.avif";

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

const timeline = [
  { year: "2008", title: "Founded in Houston", description: "Squad Medical Supplies was established with a mission to make quality DME accessible to patients across Texas." },
  { year: "2012", title: "Regional Expansion", description: "Expanded operations to serve healthcare facilities across the Gulf Coast, opening distribution centers in Louisiana and Florida." },
  { year: "2016", title: "Medicare Accreditation", description: "Achieved full Medicare accreditation and became an approved supplier for all major insurance providers." },
  { year: "2019", title: "Technology Platform Launch", description: "Launched our e-commerce platform and inventory management system, enabling same-day ordering and real-time tracking." },
  { year: "2022", title: "National Reach", description: "Expanded to serve all 50 states with a network of fulfillment centers and white-glove delivery partners." },
  { year: "2025", title: "Smart DME Initiative", description: "Pioneered connected device programs for remote patient monitoring and compliance tracking across respiratory and mobility equipment." },
];

const serviceRegions = [
  { name: "Texas & Gulf Coast", states: ["Texas", "Louisiana", "Mississippi", "Alabama"], highlight: true },
  { name: "Southeast", states: ["Florida", "Georgia", "South Carolina", "North Carolina", "Tennessee"] },
  { name: "Midwest", states: ["Illinois", "Ohio", "Michigan", "Indiana", "Wisconsin"] },
  { name: "Northeast", states: ["New York", "New Jersey", "Pennsylvania", "Connecticut", "Massachusetts"] },
  { name: "West Coast", states: ["California", "Oregon", "Washington", "Arizona", "Nevada"] },
  { name: "Mountain & Plains", states: ["Colorado", "Utah", "Montana", "Kansas", "Nebraska"] },
];

const certifications = [
  "Medicare DMEPOS Accredited Supplier",
  "FDA Registered Establishment",
  "ACHC Accredited (Accreditation Commission for Health Care)",
  "BBB A+ Rated Business",
  "HIPAA Compliant Operations",
  "ISO 13485 Certified Quality Management",
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <img src={logo} alt="Squad Medical Supplies" className="mx-auto mb-6 h-16 w-auto" loading="lazy" decoding="async" />
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">About Squad Medical Supplies</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Your trusted partner in durable medical equipment, committed to improving lives through quality healthcare solutions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Our Mission</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">Empowering Independence Through Quality Medical Equipment</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                At Squad Medical Supplies, we believe everyone deserves access to high-quality durable medical equipment. We partner with leading manufacturers and healthcare providers to deliver FDA-certified products that improve mobility, comfort, and quality of life for patients across the nation.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Our Vision</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">A World Where Quality Healthcare Equipment Is Accessible to All</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We envision a future where no patient is limited by their access to medical equipment. Through technology, partnerships, and an unwavering commitment to quality, we aim to become the most trusted DME provider in the United States, serving communities from coast to coast.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/30 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Our Journey</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Company Timeline</h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:ml-[-1px]" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative mb-8 pl-12 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"}`}
              >
                <div className={`absolute left-[10px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background ${i % 2 === 0 ? "md:left-auto md:right-[-7px]" : "md:left-[-7px]"}`} />
                <span className="text-sm font-bold text-primary">{item.year}</span>
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Our Values</span>
            <h2 className="font-display text-3xl font-bold text-foreground">What Sets Us Apart</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <v.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Coverage</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Service Areas</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Serving all 50 states with regional fulfillment centers and white-glove delivery partnerships.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceRegions.map((region, i) => (
              <motion.div key={region.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-xl border p-6 shadow-card ${region.highlight ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className={`h-5 w-5 ${region.highlight ? "text-primary" : "text-muted-foreground"}`} />
                  <h3 className="font-display text-lg font-semibold text-foreground">{region.name}</h3>
                  {region.highlight && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">HQ</span>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {region.states.map((state) => (
                    <span key={state} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{state}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Accreditations</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Certifications & Compliance</h2>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, i) => (
              <motion.div key={cert} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-card">
                <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase text-primary">Get In Touch</span>
            <h2 className="font-display text-3xl font-bold text-foreground">Contact Us</h2>
          </div>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-card">
              <MapPin className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-sm font-semibold text-foreground">Headquarters</h3>
              <p className="mt-1 text-sm text-muted-foreground">Houston, TX 77001</p>
            </div>
            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-card">
              <Phone className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-sm font-semibold text-foreground">Phone</h3>
              <p className="mt-1 text-sm text-muted-foreground">1-800-SQUAD-MED</p>
            </div>
            <div className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-card">
              <Mail className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-display text-sm font-semibold text-foreground">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">info@squadmedicalsupplies.com</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;
