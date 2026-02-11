import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import CartDrawer from "./CartDrawer";
import ContactDialog from "./ContactDialog";
import logo from "@/assets/logo.avif";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Squad Medical Supplies" className="h-14 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link to="/" className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/") ? "text-primary" : "text-foreground"}`}>Home</Link>
          <Link to="/equipment" className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary ${isActive("/equipment") ? "text-primary" : "text-foreground"}`}>DME Equipment</Link>

          {/* Resources Dropdown */}
          <div className="relative" onMouseEnter={() => setResourcesOpen(true)} onMouseLeave={() => setResourcesOpen(false)}>
            <button className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Resources <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {resourcesOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-1 w-48 rounded-lg border border-border bg-card p-1 shadow-elevated">
                  <Link to="/blog" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">Blog</Link>
                  <Link to="/case-studies" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">Case Studies</Link>
                  <Link to="/about" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary">Company Profile</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ContactDialog>
            <button className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">Contact Us</button>
          </ContactDialog>
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2 lg:flex">
          <CartDrawer />
          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link to="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-secondary">Admin</Link>
              )}
              <button onClick={signOut} className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <CartDrawer />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-md p-2 text-foreground" aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card lg:hidden">
            <nav className="flex flex-col gap-1 p-4">
              <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">Home</Link>
              <Link to="/equipment" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary">DME Equipment</Link>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Blog</Link>
              <Link to="/case-studies" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Case Studies</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">Company Profile</Link>
              {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-secondary">Admin</Link>}
              {user ? (
                <button onClick={() => { signOut(); setMobileOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-secondary">Sign Out</button>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)} className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">Sign In</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
