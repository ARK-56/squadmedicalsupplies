import { ShieldCheck, TrendingUp, Users, Heart, Building2, Stethoscope, Truck, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  icon: LucideIcon;
  challenge: string;
  solution: string;
  results: string[];
  category: string;
  fullStory: string;
  testimonial?: { quote: string; name: string; title: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "st-marys-cost-reduction",
    title: "Regional Hospital Reduces Equipment Costs by 35%",
    client: "St. Mary's Regional Medical Center",
    icon: TrendingUp,
    challenge: "High equipment procurement costs and inconsistent supply chain management across multiple departments.",
    solution: "Partnered with Squad Medical to consolidate DME purchasing, implement inventory tracking, and negotiate volume-based pricing.",
    results: ["35% reduction in equipment costs", "98% on-time delivery rate", "Streamlined procurement across 12 departments"],
    category: "Healthcare System",
    fullStory: `St. Mary's Regional Medical Center, a 450-bed facility serving over 200,000 patients annually, was struggling with fragmented DME procurement. Each department managed its own vendors, leading to duplicate orders, inconsistent pricing, and supply gaps.\n\nSquad Medical conducted a comprehensive equipment audit across all 12 departments, identifying $2.3 million in redundant inventory and overlapping vendor contracts. We consolidated their supply chain to a single-source model with guaranteed pricing tiers based on volume.\n\nThe implementation included a custom inventory management dashboard, automated reorder triggers, and a dedicated account manager available 24/7. Within the first year, St. Mary's achieved a 35% reduction in overall equipment costs while improving availability to 98% on-time delivery.\n\nThe partnership has since expanded to include preventive maintenance programs and staff training, further reducing equipment downtime by 60%.`,
    testimonial: { quote: "Squad Medical transformed our procurement process. We're saving hundreds of thousands annually while providing better equipment to our patients.", name: "Dr. Patricia Hernandez", title: "Chief Operating Officer" },
  },
  {
    id: "carefirst-patient-satisfaction",
    title: "Home Health Agency Improves Patient Satisfaction to 96%",
    client: "CareFirst Home Health Services",
    icon: Heart,
    challenge: "Patients reported delays in receiving essential mobility and respiratory equipment after hospital discharge.",
    solution: "Established a same-day delivery program and dedicated account management for seamless discharge coordination.",
    results: ["96% patient satisfaction score", "Same-day delivery for 89% of orders", "40% reduction in readmissions"],
    category: "Home Health",
    fullStory: `CareFirst Home Health Services manages over 3,000 active patients across a tri-state area. Their biggest pain point was the gap between hospital discharge and home equipment delivery. Patients were waiting 3-5 days for essential equipment, leading to falls, readmissions, and declining satisfaction scores.\n\nSquad Medical designed a same-day delivery program with strategically positioned inventory hubs. We integrated our order management system with CareFirst's discharge planning workflow, enabling automatic equipment orders triggered by discharge documentation.\n\nA dedicated squad of delivery specialists was trained in equipment setup, patient education, and basic troubleshooting. Each delivery includes a 30-minute orientation where patients learn to safely use their new equipment.\n\nThe results were transformative: patient satisfaction jumped from 72% to 96%, same-day delivery was achieved for 89% of orders, and hospital readmissions related to equipment delays dropped by 40%.`,
    testimonial: { quote: "Our patients used to dread coming home from the hospital. Now they know their equipment will be waiting for them.", name: "Angela Torres, RN", title: "Director of Patient Services" },
  },
  {
    id: "harmony-compliance",
    title: "Senior Living Facility Achieves Full Compliance",
    client: "Harmony Senior Living Communities",
    icon: ShieldCheck,
    challenge: "Aging equipment fleet failing to meet updated regulatory standards across 5 facility locations.",
    solution: "Complete equipment audit, replacement program, and ongoing compliance monitoring with preventive maintenance scheduling.",
    results: ["100% regulatory compliance", "Zero citation findings in 2 years", "Preventive maintenance program covering 500+ devices"],
    category: "Senior Living",
    fullStory: `Harmony Senior Living Communities operates five facilities housing over 800 residents. Following a state inspection that identified multiple equipment deficiencies, Harmony needed a rapid and comprehensive equipment overhaul to maintain their operating licenses.\n\nSquad Medical deployed a team of clinical equipment specialists to audit all five locations within two weeks. We cataloged over 500 pieces of equipment, identifying 127 items that failed to meet current regulatory standards.\n\nOur phased replacement program prioritized critical safety equipment first—patient lifts, hospital beds, and fall prevention devices. We implemented a digital tracking system that monitors equipment age, maintenance history, and compliance status in real time.\n\nThe ongoing preventive maintenance program includes quarterly inspections, immediate replacement of failing equipment, and staff training on proper equipment use. Harmony has maintained 100% compliance with zero citation findings for two consecutive years.`,
    testimonial: { quote: "We went from dreading inspections to welcoming them. Squad Medical gave us complete confidence in our equipment.", name: "Robert Chen", title: "VP of Operations" },
  },
  {
    id: "pacific-coast-rehab",
    title: "Rehabilitation Center Expands Capacity by 50%",
    client: "Pacific Coast Rehabilitation",
    icon: Users,
    challenge: "Growing patient demand required rapid expansion of therapy equipment and mobility devices.",
    solution: "Custom equipment leasing program with flexible terms, training support, and dedicated clinical consultation.",
    results: ["50% increase in patient capacity", "Custom leasing saved $200K annually", "Staff trained on 30+ new devices"],
    category: "Rehabilitation",
    fullStory: `Pacific Coast Rehabilitation, a leading outpatient rehab center, was turning away patients due to equipment limitations. Their existing capital budget couldn't support the rapid expansion needed to meet growing demand, particularly for advanced mobility and respiratory therapy equipment.\n\nSquad Medical developed a custom leasing program that allowed Pacific Coast to acquire $1.2 million in new equipment with flexible monthly payments tied to patient volume. This innovative financing model eliminated the need for large capital outlays while ensuring access to the latest technology.\n\nThe leasing package included comprehensive staff training on all new devices, with quarterly refresher sessions and access to our clinical support hotline. We also provided on-site clinical consultation to help therapists optimize equipment selection for individual patient treatment plans.\n\nWithin six months, Pacific Coast increased their patient capacity by 50% and added three new specialty programs. The leasing model saved them approximately $200,000 annually compared to purchasing.`,
    testimonial: { quote: "The leasing program was a game-changer. We expanded faster than we thought possible without straining our budget.", name: "Dr. James Park", title: "Medical Director" },
  },
  {
    id: "metro-health-network",
    title: "Multi-Hospital Network Standardizes Equipment Across 8 Campuses",
    client: "Metro Health Network",
    icon: Building2,
    challenge: "Inconsistent equipment brands and models across campuses created training gaps and patient safety concerns.",
    solution: "System-wide equipment standardization program with unified training curriculum and centralized inventory management.",
    results: ["Equipment standardized across 8 campuses", "Training time reduced by 45%", "15% reduction in equipment-related incidents"],
    category: "Healthcare System",
    fullStory: `Metro Health Network's rapid growth through acquisitions left them with a patchwork of equipment brands and models across their eight hospital campuses. Nurses and therapists moving between locations faced different interfaces, controls, and safety features, increasing the risk of errors.\n\nSquad Medical led a system-wide standardization initiative. We analyzed equipment inventories across all campuses, identified the highest-performing models in each category, and created a phased replacement plan that minimized disruption to patient care.\n\nThe standardization extended beyond equipment selection to include a unified training curriculum. We developed role-specific training modules and certification programs that ensured consistent competency across all locations.\n\nA centralized inventory management system allows Metro Health to redistribute equipment between campuses based on demand, reducing the need for emergency purchases by 70%. The standardization has reduced equipment-related incidents by 15% and cut training time for floating staff by 45%.`,
    testimonial: { quote: "Our staff can now move confidently between any of our campuses knowing the equipment will be familiar.", name: "Lisa Wong, MSN", title: "Chief Nursing Officer" },
  },
  {
    id: "valley-respiratory-care",
    title: "Respiratory Clinic Launches Remote Monitoring Program",
    client: "Valley Respiratory Care Associates",
    icon: Stethoscope,
    challenge: "Unable to track CPAP compliance and patient outcomes between quarterly office visits.",
    solution: "Implemented connected respiratory devices with real-time compliance monitoring and automated patient outreach.",
    results: ["CPAP compliance improved from 54% to 87%", "30% fewer emergency visits", "Automated monitoring for 2,000+ patients"],
    category: "Specialty Clinic",
    fullStory: `Valley Respiratory Care Associates manages over 2,000 patients on CPAP and BiPAP therapy. With quarterly in-office visits as their primary monitoring touchpoint, patients frequently fell off therapy between appointments, leading to poor outcomes and high emergency utilization.\n\nSquad Medical equipped all new patients with connected CPAP devices featuring wireless data transmission. Our monitoring platform tracks nightly usage, mask leak rates, AHI scores, and other key metrics, flagging patients who fall below compliance thresholds.\n\nAutomated patient outreach—including text messages, emails, and phone calls—is triggered when compliance drops, offering troubleshooting tips and scheduling intervention calls. High-risk patients are escalated to respiratory therapists for personalized support.\n\nWithin the first year, CPAP compliance improved from 54% to 87%, meeting and exceeding Medicare's compliance requirements. Emergency department visits for respiratory events dropped by 30%, and patient satisfaction with their sleep therapy reached an all-time high.`,
    testimonial: { quote: "We can now intervene within days instead of months when a patient struggles. The outcomes speak for themselves.", name: "Dr. Anita Gupta", title: "Pulmonology Director" },
  },
];
