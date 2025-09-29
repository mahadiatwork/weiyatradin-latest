"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { RFQFormData } from "@/lib/types"
import { RFQDrawer } from "./rfq-drawer"

interface RFQContextType {
  isOpen: boolean
  selectedProductId?: string
  openRFQ: (productId?: string) => void
  closeRFQ: () => void
  submitRFQ: (data: RFQFormData) => Promise<{ success: boolean }>
}

export const RFQContext = createContext<RFQContextType | undefined>(undefined)

export function RFQProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>()

  const openRFQ = (productId?: string) => {
    setSelectedProductId(productId)
    setIsOpen(true)
  }

  const closeRFQ = () => {
    setIsOpen(false)
    setSelectedProductId(undefined)
  }

  const submitRFQ = async (data: RFQFormData) => {
    // TODO: Integrate with backend API
    console.log("RFQ submitted:", data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    closeRFQ()
    return { success: true }
  }

  return (
    <RFQContext.Provider
      value={{
        isOpen,
        selectedProductId,
        openRFQ,
        closeRFQ,
        submitRFQ,
      }}
    >
      {children}
      <RFQDrawer />
    </RFQContext.Provider>
  )
}

export function useRFQ() {
  const context = useContext(RFQContext)
  if (context === undefined) {
    throw new Error("useRFQ must be used within a RFQProvider")
  }
  return context
}
