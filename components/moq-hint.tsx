import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MOQHintProps {
  currentQuantity: number
  moq: number
  priceMode: "single" | "bulk"
}

export function MOQHint({ currentQuantity, moq, priceMode }: MOQHintProps) {
  if (priceMode === "single" || currentQuantity >= moq) {
    return null
  }

  const remaining = moq - currentQuantity

  return (
    <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-amber-800 dark:text-amber-200">
        Add {remaining.toLocaleString()} more units to meet the minimum order quantity for bulk pricing.
      </AlertDescription>
    </Alert>
  )
}
