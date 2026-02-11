import { Link } from "react-router-dom";
import { useState } from "react";
import { Linkedin, Facebook, Instagram } from "lucide-react";
import ContactDialog from "./ContactDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim().toLowerCase() });
    if (error) {
      if (error.code === "23505") toast({ title: "Already subscribed!", description: "This email is already on our list." });
      else toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Subscribed!", description: "You've been added to our newsletter." });
      setEmail("");
    }
    setSubmitting(false);
  };

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="Squad Medical Supplies" className="h-12 w-auto brightness-0 invert" />
            </div>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-foreground/20 opacity-70 transition-opacity hover:opacity-100">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">About</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              <li><Link to="/about" className="hover:opacity-100">Company Profile</Link></li>
              <li><Link to="/equipment" className="hover:opacity-100">DME Equipment</Link></li>
              <li><Link to="/blog" className="hover:opacity-100">Blog</Link></li>
              <li><Link to="/case-studies" className="hover:opacity-100">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Help</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              <li>
                <ContactDialog>
                  <button className="hover:opacity-100">Contact Us</button>
                </ContactDialog>
              </li>
              <li><a href="/#faq" className="hover:opacity-100">FAQ</a></li>
              <li><Link to="/about" className="hover:opacity-100">Shipping Info</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Join our newsletter</h4>
            <p className="mb-4 text-xs opacity-60">Stay up to date on new products and offers</p>
            <form onSubmit={handleNewsletter} className="flex overflow-hidden rounded-lg border border-navy-foreground/20">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email here"
                className="flex-1 bg-transparent px-3 py-2 text-sm text-navy-foreground placeholder:opacity-40 focus:outline-none" />
              <button type="submit" disabled={submitting} className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
                {submitting ? "..." : "Join"}
              </button>
            </form>
            <p className="mt-2 text-[10px] opacity-40">By subscribing you agree to our Privacy Policy.</p>
          </div>
        </div>

        <div className="my-10 flex w-full items-center overflow-hidden">
          <svg viewBox="0 0 1200 30" className="w-full opacity-15" preserveAspectRatio="none">
            <path d="M0 15 L30 0 L60 15 L90 0 L120 15 L150 0 L180 15 L210 0 L240 15 L270 0 L300 15 L330 0 L360 15 L390 0 L420 15 L450 0 L480 15 L510 0 L540 15 L570 0 L600 15 L630 0 L660 15 L690 0 L720 15 L750 0 L780 15 L810 0 L840 15 L870 0 L900 15 L930 0 L960 15 L990 0 L1020 15 L1050 0 L1080 15 L1110 0 L1140 15 L1170 0 L1200 15" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-xs opacity-50 md:flex-row">
          <p>© 2025 Squad Medical Supplies. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Service</Link>
            <a href="#">Cookie Settings</a>
          </div>
        </div>

        <p className="mt-6 text-[9px] uppercase leading-relaxed opacity-30">
          SQUAD MEDICAL SUPPLIES PROVIDES ACCESS TO DURABLE MEDICAL EQUIPMENT THROUGH CERTIFIED MANUFACTURERS AND DISTRIBUTORS. IT IS NOT A MEDICAL PROVIDER AND DOES NOT OFFER MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT. ALL PRODUCT INFORMATION IS FOR INFORMATIONAL PURPOSES ONLY AND SHOULD BE REVIEWED WITH A LICENSED HEALTHCARE PROFESSIONAL. PRODUCT AVAILABILITY AND SHIPPING TIMES MAY VARY BY LOCATION AND INDIVIDUAL CIRCUMSTANCES. BY SUBMITTING YOUR CONTACT INFORMATION, YOU CONSENT TO RECEIVE COMMUNICATIONS FROM SQUAD MEDICAL SUPPLIES.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
