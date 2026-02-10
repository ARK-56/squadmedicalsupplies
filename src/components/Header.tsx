import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">S</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-foreground">SQUAD MEDICAL</p>
            <p className="text-[10px] font-medium tracking-wider text-muted-foreground">SUPPLIES</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
              isActive("/") ? "text-primary" : "text-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/equipment"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
              isActive("/equipment") ? "text-primary" : "text-foreground"
            }`}
          >
            DME Equipment
          </Link>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Resources <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-border bg-card p-1 shadow-elevated"
                >
                  <Link to="/blog" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">
                    Blog
                  </Link>
                  <Link to="/case-studies" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">
                    Case Studies
                  </Link>
                  <Link to="/about" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">
                    Company Profile
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/contact"
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
              isActive("/contact") ? "text-primary" : "text-foreground"
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/equipment"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card lg:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">Home</Link>
              <Link to="/equipment" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">DME Equipment</Link>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Blog</Link>
              <Link to="/case-studies" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Case Studies</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Company Profile</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">Contact Us</Link>
              <Link to="/equipment" onClick={() => setMobileOpen(false)} className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">Shop Now</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
