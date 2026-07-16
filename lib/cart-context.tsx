"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { CartItem, Product } from "./types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  badgePulse: boolean;
  flyTarget: { x: number; y: number } | null;
  lastAddedId: string | null;
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE"; open?: boolean }
  | { type: "PULSE_BADGE" }
  | { type: "RESET_PULSE" }
  | { type: "SET_FLY_TARGET"; target: { x: number; y: number } | null }
  | { type: "SET_LAST_ADDED"; id: string | null };

const initialState: CartState = {
  items: [],
  isOpen: false,
  badgePulse: false,
  flyTarget: null,
  lastAddedId: null,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.product.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { ...action.product, quantity: 1 }];
      return {
        ...state,
        items,
        badgePulse: true,
        lastAddedId: action.product.id,
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "UPDATE_QTY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE":
      return { ...state, isOpen: action.open ?? !state.isOpen };
    case "PULSE_BADGE":
      return { ...state, badgePulse: true };
    case "RESET_PULSE":
      return { ...state, badgePulse: false };
    case "SET_FLY_TARGET":
      return { ...state, flyTarget: action.target };
    case "SET_LAST_ADDED":
      return { ...state, lastAddedId: action.id };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  badgePulse: boolean;
  flyTarget: { x: number; y: number } | null;
  lastAddedId: string | null;
  itemCount: number;
  total: number;
  addItem: (product: Product, originRect?: DOMRect) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  resetBadgePulse: () => void;
  setFlyTarget: (target: { x: number; y: number } | null) => void;
  clearLastAdded: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback(
    (product: Product, originRect?: DOMRect) => {
      if (originRect) {
        dispatch({
          type: "SET_FLY_TARGET",
          target: {
            x: originRect.left + originRect.width / 2,
            y: originRect.top + originRect.height / 2,
          },
        });
      }
      dispatch({ type: "ADD", product });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QTY", id, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const toggleCart = useCallback((open?: boolean) => {
    dispatch({ type: "TOGGLE", open });
  }, []);

  const resetBadgePulse = useCallback(() => {
    dispatch({ type: "RESET_PULSE" });
  }, []);

  const setFlyTarget = useCallback(
    (target: { x: number; y: number } | null) => {
      dispatch({ type: "SET_FLY_TARGET", target });
    },
    []
  );

  const clearLastAdded = useCallback(() => {
    dispatch({ type: "SET_LAST_ADDED", id: null });
  }, []);

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const total = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      badgePulse: state.badgePulse,
      flyTarget: state.flyTarget,
      lastAddedId: state.lastAddedId,
      itemCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      resetBadgePulse,
      setFlyTarget,
      clearLastAdded,
    }),
    [
      state,
      itemCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      resetBadgePulse,
      setFlyTarget,
      clearLastAdded,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
