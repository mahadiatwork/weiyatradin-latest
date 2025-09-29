"use client"

import { useContext } from "react"
import { RFQContext } from "@/components/rfq-provider"

export function useRFQ() {
  const context = useContext(RFQContext)
  if (context === undefined) {
    throw new Error("useRFQ must be used within a RFQProvider")
  }
  return context
}
