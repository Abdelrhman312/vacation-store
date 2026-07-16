import { CartItem, CheckoutData } from "./types";
import { PAYMENT_DETAILS, formatPrice } from "./products";

function normalizeWhatsAppNumber(number: string): string {
  const cleaned = number.replace(/[^\d]/g, "");

  if (!cleaned) return "201069047415";

  if (cleaned.startsWith("00")) return cleaned.slice(2);
  if (cleaned.startsWith("+")) return cleaned.slice(1);
  if (cleaned.startsWith("0") && cleaned.length > 10) return cleaned.slice(1);

  return cleaned;
}

export function buildWhatsAppUrl(
  items: CartItem[],
  checkout: CheckoutData,
  total: number
): string {
  const payment = PAYMENT_DETAILS[checkout.paymentMethod];
  const lines = [
    "*New Order — Gadget Accessories*",
    "",
    "*Customer Info*",
    `Name: ${checkout.name}`,
    `Phone: ${checkout.phone}`,
    `Governorate: ${checkout.governorate}`,
    `Address: ${checkout.address}`,
    "",
    "*Items*",
    ...items.map(
      (item) =>
        `• ${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
    ),
    "",
    `*Total: ${formatPrice(total)}*`,
    "",
    `*Payment: ${payment.label}*`,
    `Wallet: ${payment.number}`,
    "",
    "Please confirm once payment is sent. Thank you!",
  ];

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201069047415";
  const normalizedNumber = normalizeWhatsAppNumber(rawNumber);
  const text = encodeURIComponent(lines.join("\n"));

  return `https://wa.me/${normalizedNumber}?text=${text}`;
}
