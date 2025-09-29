"use client"

import { useState, useEffect } from "react"
import { type Product, getOptimalPriceMode } from "@/lib/price"

export function usePriceMode(product: Product, quantity: number) {
  const [mode, setMode] = useState<"single" | "bulk">("single")

  useEffect(() => {
    const optimalMode = getOptimalPriceMode(product, quantity)
    setMode(optimalMode)
  }, [product, quantity])

  const toggleMode = (newMode: "single" | "bulk") => {
    setMode(newMode)
  }

  return { mode, setMode: toggleMode }
}
