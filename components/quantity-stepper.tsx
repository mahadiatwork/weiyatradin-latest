"use client"

import type React from "react"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export function QuantityStepper({ value, onChange, min = 1, max = 10000, step = 1 }: QuantityStepperProps) {
  const handleDecrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(newValue)
  }

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step)
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value) || min
    const clampedValue = Math.max(min, Math.min(max, newValue))
    onChange(clampedValue)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDecrement}
        disabled={value <= min}
        className="h-9 w-9 p-0 bg-transparent"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-20 text-center"
      />
      <Button variant="outline" size="sm" onClick={handleIncrement} disabled={value >= max} className="h-9 w-9 p-0">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
