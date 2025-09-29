"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface PriceToggleProps {
  value: "single" | "bulk"
  onValueChange: (value: "single" | "bulk") => void
  disabled?: boolean
}

export function PriceToggle({ value, onValueChange, disabled }: PriceToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(newValue) => {
        if (newValue) onValueChange(newValue as "single" | "bulk")
      }}
      className="grid w-full grid-cols-2"
      disabled={disabled}
    >
      <ToggleGroupItem value="single" className="text-sm">
        Single Order
      </ToggleGroupItem>
      <ToggleGroupItem value="bulk" className="text-sm">
        Bulk Order
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
