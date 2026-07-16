"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { PaymentMethod } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { buildWhatsAppAppLink, buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import PaymentMethods from "./PaymentMethods";
import Icon from "./Icon";

const GOVERNORATES = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Qalyubia",
  "Sharqia",
  "Dakahlia",
  "Beheira",
  "Gharbia",
  "Monufia",
  "Other",
];

export default function CheckoutForm() {
  const { items, total, clearCart, toggleCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("vodafone_cash");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!phone.trim() || phone.length < 10)
      next.phone = "Valid phone number required";
    if (!governorate) next.governorate = "Select a governorate";
    if (!address.trim()) next.address = "Address is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    setSubmitting(true);
    const checkoutData = {
      name: name.trim(),
      phone: phone.trim(),
      governorate,
      address: address.trim(),
      paymentMethod,
    };

    const url = buildWhatsAppUrl(items, checkoutData, total);
    const message = buildWhatsAppMessage(items, checkoutData, total);
    const appLink = buildWhatsAppAppLink(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "201069047415",
      message
    );

    clearCart();
    toggleCart(false);

    window.location.href = appLink;
    window.setTimeout(() => {
      window.location.href = url;
    }, 1500);

    setSubmitting(false);
  };

  if (items.length === 0) return null;

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="border-t border-surface-border pt-5 mt-5 space-y-4"
    >
      <p className="text-sm font-semibold text-gray-900">Checkout</p>

      <div className="space-y-3">
        <Field
          label="Full Name"
          value={name}
          onChange={setName}
          error={errors.name}
          placeholder="Ahmed Mohamed"
        />
        <Field
          label="Phone Number"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          placeholder="01xxxxxxxxx"
          type="tel"
        />
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Governorate
          </label>
          <div className="relative">
            <select
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              className={`w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
                errors.governorate ? "border-red-400" : "border-surface-border"
              }`}
            >
              <option value="">Select governorate</option>
              {GOVERNORATES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          {errors.governorate && (
            <p className="mt-1 text-xs text-red-500">{errors.governorate}</p>
          )}
        </div>
        <Field
          label="Address"
          value={address}
          onChange={setAddress}
          error={errors.address}
          placeholder="Street, building, apartment"
        />
      </div>

      <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-gray-500">Order Total</span>
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(total)}
        </span>
      </div>

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-semibold text-white hover:bg-[#20bd5a] transition-colors disabled:opacity-60"
      >
        <Icon name="whatsapp" size={18} />
        Confirm Order via WhatsApp
      </motion.button>
    </motion.form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors ${
          error ? "border-red-400" : "border-surface-border"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
