"use client";

import { motion } from "framer-motion";
import { PaymentMethod } from "@/lib/types";
import { PAYMENT_DETAILS } from "@/lib/products";
import Icon from "./Icon";

interface PaymentMethodsProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const INSTAPAY_QR_PATTERN = [
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
  0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
];

const METHODS: {
  id: PaymentMethod;
  icon: "wallet" | "instapay";
}[] = [
  { id: "vodafone_cash", icon: "wallet" },
  { id: "etisalat_cash", icon: "wallet" },
  { id: "orange_cash", icon: "wallet" },
  { id: "instapay", icon: "instapay" },
];

export default function PaymentMethods({
  selected,
  onChange,
}: PaymentMethodsProps) {
  const details = PAYMENT_DETAILS[selected];

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-gray-900">Payment Method</p>

      <div className="grid grid-cols-2 gap-2">
        {METHODS.map((method) => {
          const info = PAYMENT_DETAILS[method.id];
          const isActive = selected === method.id;
          return (
            <motion.button
              key={method.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(method.id)}
              className={`flex items-center gap-2 rounded-xl border p-3 text-left transition-all ${
                isActive
                  ? "border-accent bg-accent-muted"
                  : "border-surface-border hover:border-gray-300"
              }`}
            >
              <Icon
                name={method.icon}
                size={18}
                className={isActive ? "text-accent" : "text-gray-500"}
              />
              <span className="text-xs sm:text-sm font-medium text-gray-900">
                {info.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-xl border border-surface-border bg-surface-secondary p-4"
      >
        <p className="text-xs text-gray-500 leading-relaxed">
          {details.instructions}
        </p>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-white border border-surface-border px-3 py-2.5">
          <span className="text-xs text-gray-500">Send to</span>
          <span className="text-sm font-semibold text-gray-900 font-mono select-all">
            {details.number}
          </span>
        </div>

        {selected === "instapay" && (
          <div className="mt-3 flex flex-col items-center gap-2 rounded-lg bg-white border border-dashed border-surface-border p-4">
            <div className="grid grid-cols-7 gap-0.5 p-2 bg-white">
              {INSTAPAY_QR_PATTERN.map((filled, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                    filled ? "bg-gray-900" : "bg-white"
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-gray-400">Scan via InstaPay app</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
