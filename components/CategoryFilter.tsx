"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/products";
import Icon, { categoryIcon } from "./Icon";
import { Category } from "@/lib/types";

interface CategoryFilterProps {
  active: Category | "all";
  onChange: (category: Category | "all") => void;
}

export default function CategoryFilter({
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <section id="categories" className="px-4 sm:px-6 pb-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          <button
            onClick={() => onChange("all")}
            className={`col-span-2 sm:col-span-1 flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
              active === "all"
                ? "border-accent bg-accent-muted shadow-sm"
                : "border-surface-border bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
              <Icon name="cart" size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">All</p>
              <p className="text-xs text-gray-500">View everything</p>
            </div>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                active === cat.id
                  ? "border-accent bg-accent-muted shadow-sm"
                  : "border-surface-border bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  active === cat.id
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <Icon name={categoryIcon(cat.id)} size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-500 truncate hidden sm:block">
                  {cat.description}
                </p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
