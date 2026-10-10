"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types/store";
type CartState = {
  items: CartLine[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (line: CartLine) => void;
  remove: (id: string) => void;
  quantity: (id: string, count: number) => void;
  clear: () => void;
};
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (line) =>
        set((state) => {
          const exists = state.items.find(
            (i) => i.variantId === line.variantId,
          );
          return {
            open: true,
            items: exists
              ? state.items.map((i) =>
                  i.variantId === line.variantId
                    ? {
                        ...line,
                        quantity: Math.min(999, i.quantity + line.quantity),
                      }
                    : i,
                )
              : [...state.items, line].slice(0, 50),
          };
        }),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== id),
        })),
      quantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === id
              ? { ...i, quantity: Math.max(1, Math.min(999, quantity)) }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "nevada-cart-v1",
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);
