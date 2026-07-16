"use client";

import { motion } from "framer-motion";
import Icon from "./Icon";

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
            Premium Accessories
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            Essential gear for your everyday tech.
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg">
            Curated cases, bands, stands, and power solutions — designed to
            complement your devices without the clutter.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToProducts}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Shop Collection
            <Icon name="arrow-right" size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
