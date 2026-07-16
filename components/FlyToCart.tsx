"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function FlyToCart() {
  const { flyTarget, lastAddedId, setFlyTarget, clearLastAdded } = useCart();
  const [cartPos, setCartPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!flyTarget || !lastAddedId) return;

    const cartBtn = document.getElementById("cart-button");
    if (!cartBtn) return;

    const rect = cartBtn.getBoundingClientRect();
    setCartPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, [flyTarget, lastAddedId]);

  const handleComplete = () => {
    setFlyTarget(null);
    clearLastAdded();
    setCartPos(null);
  };

  return (
    <AnimatePresence>
      {flyTarget && cartPos && (
        <motion.div
          key={lastAddedId}
          initial={{
            position: "fixed",
            left: flyTarget.x - 12,
            top: flyTarget.y - 12,
            zIndex: 9999,
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: "#2563eb",
            opacity: 1,
            scale: 1,
          }}
          animate={{
            left: cartPos.x - 8,
            top: cartPos.y - 8,
            scale: 0.3,
            opacity: 0,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={handleComplete}
          className="pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
