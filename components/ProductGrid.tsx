"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { Category } from "@/lib/types";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

      <section id="products" className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            layout
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No products in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
