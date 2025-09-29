"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useRFQ } from "@/hooks/use-rfq"
import { mockProducts, incoterms } from "@/lib/mock"
import type { RFQFormData } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export function RFQDrawer() {
  const { isOpen, selectedProductId, closeRFQ, submitRFQ } = useRFQ()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedProduct = selectedProductId ? mockProducts.find((p) => p.id === selectedProductId) : null

  const [formData, setFormData] = useState<RFQFormData>({
    companyName: "",
    country: "",
    targetQuantity: selectedProduct?.moq || 100,
    incoterms: "FOB",
    targetUnitPrice: undefined,
    requiredCertifications: "",
    notes: "",
    productId: selectedProductId,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await submitRFQ({ ...formData, productId: selectedProductId })
      toast({
        title: "RFQ Submitted Successfully",
        description: "We'll review your request and get back to you within 24 hours.",
      })
      // Reset form
      setFormData({
        companyName: "",
        country: "",
        targetQuantity: selectedProduct?.moq || 100,
        incoterms: "FOB",
        targetUnitPrice: undefined,
        requiredCertifications: "",
        notes: "",
        productId: selectedProductId,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit RFQ. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof RFQFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeRFQ}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Request for Quote
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {selectedProduct && (
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Selected Product</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{selectedProduct.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {selectedProduct.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      MOQ: {selectedProduct.moq}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Company Information</h3>
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Your company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                    <SelectItem value="AU">Australia</SelectItem>
                    <SelectItem value="JP">Japan</SelectItem>
                    <SelectItem value="CN">China</SelectItem>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="BR">Brazil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Order Requirements</h3>
              <div>
                <Label htmlFor="targetQuantity">Target Quantity *</Label>
                <Input
                  id="targetQuantity"
                  type="number"
                  value={formData.targetQuantity}
                  onChange={(e) => handleInputChange("targetQuantity", Number.parseInt(e.target.value) || 0)}
                  placeholder="Enter quantity"
                  min={selectedProduct?.moq || 1}
                  required
                />
                {selectedProduct && formData.targetQuantity < selectedProduct.moq && (
                  <p className="text-sm text-amber-600 mt-1">Minimum order quantity is {selectedProduct.moq} units</p>
                )}
              </div>

              <div>
                <Label htmlFor="incoterms">Preferred Incoterms *</Label>
                <Select
                  value={formData.incoterms}
                  onValueChange={(value) => handleInputChange("incoterms", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {incoterms.map((term) => (
                      <SelectItem key={term.value} value={term.value}>
                        {term.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetUnitPrice">Target Unit Price (USD)</Label>
                <Input
                  id="targetUnitPrice"
                  type="number"
                  step="0.01"
                  value={formData.targetUnitPrice || ""}
                  onChange={(e) =>
                    handleInputChange("targetUnitPrice", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                  }
                  placeholder="Optional target price per unit"
                />
              </div>
            </div>

            {/* Additional Requirements */}
            <div className="space-y-4">
              <h3 className="font-semibold">Additional Requirements</h3>
              <div>
                <Label htmlFor="requiredCertifications">Required Certifications</Label>
                <Input
                  id="requiredCertifications"
                  value={formData.requiredCertifications}
                  onChange={(e) => handleInputChange("requiredCertifications", e.target.value)}
                  placeholder="e.g., CE, FCC, UL, ISO"
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any special requirements, customization needs, or additional information..."
                  rows={4}
                />
              </div>

              {/* File Upload Placeholder */}
              <div>
                <Label>Attachments</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload specifications, drawings, or reference materials
                  </p>
                  <Button type="button" variant="outline" size="sm" disabled>
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Max 10MB per file. PDF, DOC, JPG, PNG supported.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={closeRFQ} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit RFQ
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Response Time:</strong> We typically respond to RFQs within 24 hours during business days. For
              urgent requests, please call +1 (555) 123-4567.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
