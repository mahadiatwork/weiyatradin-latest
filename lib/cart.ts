import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "./types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity: number, priceMode: "single" | "bulk") => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updatePriceMode: (productId: string, priceMode: "single" | "bulk") => void
  clearCart: () => void
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity, priceMode) => {
        const items = get().items
        const existingItem = items.find((item) => item.product.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + quantity, priceMode } : item,
            ),
          })
        } else {
          set({
            items: [...items, { product, quantity, priceMode }],
          })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
        })
      },

      updatePriceMode: (productId, priceMode) => {
        set({
          items: get().items.map((item) => (item.product.id === productId ? { ...item, priceMode } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
