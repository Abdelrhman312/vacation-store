import { CartItem, CheckoutData } from "./types";
import { PAYMENT_DETAILS, formatPrice } from "./products";

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

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+0201069047415"}?text=${text}`;
}
