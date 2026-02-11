import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PAGE_TITLES: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Squad Medical Supplies | Your GO-TO Medical Supplier",
    description: "Premium FDA-certified durable medical equipment. Wheelchairs, hospital beds, CPAP machines, oxygen concentrators, and more delivered nationwide.",
  },
  "/equipment": {
    title: "DME Equipment Catalog | Squad Medical Supplies",
    description: "Browse our full catalog of FDA-certified durable medical equipment including wheelchairs, hospital beds, respiratory devices, and mobility aids.",
  },
  "/blog": {
    title: "Blog & Resources | Squad Medical Supplies",
    description: "Expert advice, buying guides, patient education, and the latest in durable medical equipment from Squad Medical Supplies.",
  },
  "/case-studies": {
    title: "Case Studies & Success Stories | Squad Medical Supplies",
    description: "See how healthcare organizations partner with Squad Medical to improve patient outcomes and reduce equipment costs.",
  },
  "/about": {
    title: "About Us | Squad Medical Supplies",
    description: "Learn about Squad Medical Supplies - your trusted partner in durable medical equipment since 2008. FDA certified, HIPAA compliant, nationwide delivery.",
  },
  "/auth": {
    title: "Sign In | Squad Medical Supplies",
    description: "Sign in to your Squad Medical Supplies account to manage orders, track deliveries, and access your DME equipment history.",
  },
  "/checkout": {
    title: "Checkout | Squad Medical Supplies",
    description: "Complete your durable medical equipment order securely with Squad Medical Supplies.",
  },
  "/admin": {
    title: "Admin Dashboard | Squad Medical Supplies",
    description: "Manage products and reviews for Squad Medical Supplies.",
  },
};

const SEOHead = () => {
  const location = useLocation();

  useEffect(() => {
    const basePath = "/" + location.pathname.split("/").filter(Boolean)[0] || "/";
    const path = location.pathname === "/" ? "/" : basePath;
    const meta = PAGE_TITLES[path] || PAGE_TITLES["/"];

    document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);
  }, [location.pathname]);

  return null;
};

export default SEOHead;
