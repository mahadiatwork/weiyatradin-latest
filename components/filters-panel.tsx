"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { categories } from "@/lib/mock"
import { formatCurrency } from "@/lib/price"

export interface FilterState {
  categories: string[]
  priceRange: [number, number]
  moqRange: [number, number]
}

interface FiltersPanelProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

export function FiltersPanel({ filters, onFiltersChange, onClearFilters }: FiltersPanelProps) {
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [moqOpen, setMoqOpen] = useState(true)

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

    onFiltersChange({
      ...filters,
      categories: newCategories,
    })
  }

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]],
    })
  }

  const handleMoqRangeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      moqRange: [value[0], value[1]],
    })
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200 ||
    filters.moqRange[0] > 1 ||
    filters.moqRange[1] < 1000

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0 text-xs hover:bg-transparent"
                  onClick={() => handleCategoryChange(category, false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
              <Badge variant="secondary" className="text-xs">
                Price: {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0 text-xs hover:bg-transparent"
                  onClick={() => handlePriceRangeChange([0, 200])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {(filters.moqRange[0] > 1 || filters.moqRange[1] < 1000) && (
              <Badge variant="secondary" className="text-xs">
                MOQ: {filters.moqRange[0]} - {filters.moqRange[1]}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0 text-xs hover:bg-transparent"
                  onClick={() => handleMoqRangeChange([1, 1000])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 font-medium">
            Categories
            <ChevronDown className={`h-4 w-4 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 font-medium">
            Price Range
            <ChevronDown className={`h-4 w-4 transition-transform ${priceOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-3">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={200}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(filters.priceRange[0])}</span>
            <span>{formatCurrency(filters.priceRange[1])}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* MOQ Range */}
      <Collapsible open={moqOpen} onOpenChange={setMoqOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex w-full justify-between p-0 font-medium">
            Minimum Order Quantity
            <ChevronDown className={`h-4 w-4 transition-transform ${moqOpen ? "rotate-180" : ""}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-3">
          <div className="px-2">
            <Slider
              value={filters.moqRange}
              onValueChange={handleMoqRangeChange}
              max={1000}
              min={1}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.moqRange[0]}</span>
            <span>{filters.moqRange[1]}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
