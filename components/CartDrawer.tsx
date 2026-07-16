"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import CheckoutForm from "./CheckoutForm";
import Icon, { categoryIcon } from "./Icon";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    toggleCart,
    removeItem,
    updateQuantity,
    total,
    itemCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Your Cart
                </h2>
                <p className="text-xs text-gray-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-secondary text-gray-400 mb-4">
                    <Icon name="cart" size={28} />
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Cart is empty
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Add items to get started
                  </p>
                  <button
                    onClick={() => toggleCart(false)}
                    className="mt-4 text-sm font-medium text-accent hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 rounded-xl border border-surface-border p-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-secondary text-gray-600">
                        <Icon
                          name={categoryIcon(item.category)}
                          size={20}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {formatPrice(item.price)}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-surface-border hover:bg-gray-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Icon name="minus" size={14} />
                          </button>
                          <span className="text-sm font-medium text-gray-900 w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-surface-border hover:bg-gray-50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Icon name="plus" size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}

              {items.length > 0 && <CheckoutForm />}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
