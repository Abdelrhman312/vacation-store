"use client";

import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import Icon, { categoryIcon } from "./Icon";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addItem(product, rect);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col rounded-2xl border border-surface-border bg-white p-4 sm:p-5 hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-secondary text-gray-700 group-hover:bg-accent-muted group-hover:text-accent transition-colors">
          <Icon name={categoryIcon(product.category)} size={24} />
        </div>
        {product.badge && (
          <span className="rounded-full bg-accent-muted px-2.5 py-0.5 text-[11px] font-semibold text-accent">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
        {product.name}
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-gray-500 leading-relaxed flex-1">
        {product.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="text-sm sm:text-base font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleAdd}
          className="flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-2 text-xs sm:text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          <Icon name="plus" size={14} />
          Add
        </motion.button>
      </div>
    </motion.article>
  );
}
