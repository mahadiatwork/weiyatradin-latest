import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"

interface BulkBadgeProps {
  moq: number
  className?: string
}

export function BulkBadge({ moq, className }: BulkBadgeProps) {
  return (
    <Badge variant="outline" className={className}>
      <Package className="h-3 w-3 mr-1" />
      MOQ: {moq.toLocaleString()}
    </Badge>
  )
}
