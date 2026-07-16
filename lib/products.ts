import { CategoryInfo, Product } from "./types";

export const WHATSAPP_NUMBER = "201234567890";

export const PAYMENT_DETAILS: Record<
  string,
  { label: string; number: string; instructions: string }
> = {
  vodafone_cash: {
    label: "Vodafone Cash",
    number: "01012345678",
    instructions: "Transfer the total amount to this Vodafone Cash number, then confirm your order.",
  },
  etisalat_cash: {
    label: "Etisalat Cash",
    number: "01112345678",
    instructions: "Send the payment via Etisalat Cash to the number below.",
  },
  orange_cash: {
    label: "Orange Cash",
    number: "01212345678",
    instructions: "Transfer via Orange Cash wallet to complete your purchase.",
  },
  instapay: {
    label: "InstaPay",
    number: "gadgetstore@instapay",
    instructions: "Open your banking app, select InstaPay, and send to the address below.",
  },
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "airpods",
    label: "AirPods",
    description: "Cases, straps & protection",
  },
  {
    id: "watches",
    label: "Smart Watches",
    description: "Bands, chargers & docks",
  },
  {
    id: "headphones",
    label: "Headphones",
    description: "Stands, pads & cables",
  },
  {
    id: "powerbanks",
    label: "Power Banks",
    description: "Compact & fast-charging",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "ap-001",
    name: "Silicone AirPods Case",
    description: "Soft-touch silicone with carabiner clip. Fits Pro & 3rd gen.",
    price: 149,
    category: "airpods",
    badge: "Best Seller",
  },
  {
    id: "ap-002",
    name: "Leather AirPods Pouch",
    description: "Premium vegan leather with magnetic closure.",
    price: 199,
    category: "airpods",
  },
  {
    id: "ap-003",
    name: "Anti-Lost Strap",
    description: "Woven nylon strap keeps your buds secure on the go.",
    price: 79,
    category: "airpods",
  },
  {
    id: "sw-001",
    name: "Sport Band — Midnight",
    description: "Breathable fluoroelastomer band for Apple Watch.",
    price: 249,
    category: "watches",
    badge: "New",
  },
  {
    id: "sw-002",
    name: "Magnetic Charging Dock",
    description: "Aluminum stand with fast-charge puck. Cable included.",
    price: 349,
    category: "watches",
  },
  {
    id: "sw-003",
    name: "Nylon Loop Band",
    description: "Adjustable hook-and-loop nylon in slate gray.",
    price: 179,
    category: "watches",
  },
  {
    id: "hp-001",
    name: "Over-Ear Stand",
    description: "Minimal aluminum stand for studio headphones.",
    price: 299,
    category: "headphones",
    badge: "Popular",
  },
  {
    id: "hp-002",
    name: "Memory Foam Ear Pads",
    description: "Replacement pads compatible with major brands.",
    price: 129,
    category: "headphones",
  },
  {
    id: "hp-003",
    name: "Braided Audio Cable",
    description: "1.2m braided 3.5mm cable with inline mic.",
    price: 99,
    category: "headphones",
  },
  {
    id: "pb-001",
    name: "Slim 10,000 mAh",
    description: "Pocket-sized power bank with 20W USB-C PD.",
    price: 399,
    category: "powerbanks",
    badge: "Best Seller",
  },
  {
    id: "pb-002",
    name: "MagSafe Power Bank",
    description: "5,000 mAh wireless attach for iPhone & AirPods.",
    price: 549,
    category: "powerbanks",
  },
  {
    id: "pb-003",
    name: "Triple-Port 20,000 mAh",
    description: "High-capacity bank with dual USB-C and USB-A.",
    price: 699,
    category: "powerbanks",
  },
];

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("en-EG")} EGP`;
}
