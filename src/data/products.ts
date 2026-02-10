export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  hcpcsCode: string;
  fdaClass: string;
  isPrescriptionRequired: boolean;
  shippingClass: "standard" | "ltl-freight" | "white-glove";
  warrantyType: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  colors?: string[];
  sizes?: string[];
  description: string;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "ProLite Ultra Wheelchair",
    price: 1257,
    originalPrice: 1635,
    image: "/product-wheelchair.jpg",
    category: "Wheelchairs",
    hcpcsCode: "K0001",
    fdaClass: "Class I",
    isPrescriptionRequired: false,
    shippingClass: "standard",
    warrantyType: "2-Year Limited",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    colors: ["Black", "Blue", "Silver"],
    sizes: ["Standard", "Wide"],
    description: "Ultra-lightweight aluminum frame wheelchair with ergonomic design for maximum comfort and mobility.",
    isSale: true,
  },
  {
    id: "2",
    name: "MedCare Hospital Bed",
    price: 2897,
    originalPrice: 3450,
    image: "/product-hospital-bed.jpg",
    category: "Hospital Beds",
    hcpcsCode: "E0260",
    fdaClass: "Class II",
    isPrescriptionRequired: true,
    shippingClass: "white-glove",
    warrantyType: "5-Year Full",
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    description: "Full-electric adjustable hospital bed with premium mattress, side rails, and whisper-quiet motor.",
    isSale: true,
  },
  {
    id: "3",
    name: "StrideSafe Rollator Walker",
    price: 389,
    image: "/product-walker.jpg",
    category: "Walkers & Rollators",
    hcpcsCode: "E0143",
    fdaClass: "Class I",
    isPrescriptionRequired: false,
    shippingClass: "standard",
    warrantyType: "1-Year Limited",
    inStock: true,
    rating: 4.7,
    reviewCount: 256,
    colors: ["Red", "Blue", "Black"],
    description: "Four-wheel rollator with padded seat, storage basket, and adjustable height handles.",
  },
  {
    id: "4",
    name: "AirSense CPAP Machine",
    price: 1442,
    originalPrice: 1875,
    image: "/product-cpap.jpg",
    category: "Respiratory",
    hcpcsCode: "E0601",
    fdaClass: "Class II",
    isPrescriptionRequired: true,
    shippingClass: "standard",
    warrantyType: "3-Year Full",
    inStock: true,
    rating: 4.6,
    reviewCount: 198,
    description: "Auto-adjusting CPAP with heated humidifier, quiet operation, and integrated data tracking.",
    isSale: true,
  },
  {
    id: "5",
    name: "OxyFlow Concentrator",
    price: 1861,
    originalPrice: 2795,
    image: "/product-oxygen.jpg",
    category: "Respiratory",
    hcpcsCode: "E1390",
    fdaClass: "Class II",
    isPrescriptionRequired: true,
    shippingClass: "ltl-freight",
    warrantyType: "3-Year Full",
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
    description: "Portable oxygen concentrator with continuous flow, long battery life, and FAA-approved for air travel.",
    isSale: true,
  },
  {
    id: "6",
    name: "FlexRide Knee Scooter",
    price: 279,
    image: "/product-knee-scooter.jpg",
    category: "Mobility Scooters",
    hcpcsCode: "E0118",
    fdaClass: "Class I",
    isPrescriptionRequired: false,
    shippingClass: "standard",
    warrantyType: "1-Year Limited",
    inStock: true,
    rating: 4.5,
    reviewCount: 312,
    colors: ["Black", "Blue"],
    description: "Steerable knee scooter with dual braking system, adjustable knee pad, and foldable design.",
  },
];

export const categories = [
  "All",
  "Wheelchairs",
  "Hospital Beds",
  "Walkers & Rollators",
  "Respiratory",
  "Mobility Scooters",
  "Bath Safety",
  "Patient Lifts",
];
