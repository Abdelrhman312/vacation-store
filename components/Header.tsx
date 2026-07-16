"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import Icon from "./Icon";

export default function Header() {
  const { itemCount, toggleCart, badgePulse, resetBadgePulse } = useCart();

  useEffect(() => {
    if (!badgePulse) return;
    const timer = setTimeout(resetBadgePulse, 500);
    return () => clearTimeout(timer);
  }, [badgePulse, resetBadgePulse]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-surface-border"
    >
      <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => scrollTo("hero")}
          className="text-base sm:text-lg font-semibold tracking-tight text-gray-900"
        >
          Gadget<span className="text-accent">.</span>
        </button>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
          {[
            { label: "Products", id: "products" },
            { label: "Categories", id: "categories" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="hover:text-gray-900 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          id="cart-button"
          onClick={() => toggleCart(true)}
          className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={`Cart, ${itemCount} items`}
        >
          <Icon name="cart" size={22} />
          {itemCount > 0 && (
            <motion.span
              key={itemCount}
              animate={badgePulse ? { scale: [1, 1.4, 0.9, 1] } : {}}
              transition={{ duration: 0.45 }}
              className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white"
            >
              {itemCount}
            </motion.span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
