"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Send, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { incoterms } from "@/lib/mock"
import type { RFQFormData } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function RFQPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState<RFQFormData>({
    companyName: "",
    country: "",
    targetQuantity: 100,
    incoterms: "FOB",
    targetUnitPrice: undefined,
    requiredCertifications: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    toast({
      title: "RFQ Submitted Successfully",
      description: "We'll review your request and get back to you within 24 hours.",
    })
  }

  const handleInputChange = (field: keyof RFQFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <CheckCircle className="h-16 w-16 mx-auto text-green-600" />
              <h1 className="text-3xl font-bold">RFQ Submitted Successfully!</h1>
              <p className="text-lg text-muted-foreground">
                Thank you for your request. Our team will review your requirements and respond within 24 hours.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      1
                    </div>
                    <h3 className="font-medium mb-1">Review</h3>
                    <p className="text-muted-foreground">Our team reviews your requirements</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      2
                    </div>
                    <h3 className="font-medium mb-1">Quote</h3>
                    <p className="text-muted-foreground">We prepare a detailed quotation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      3
                    </div>
                    <h3 className="font-medium mb-1">Response</h3>
                    <p className="text-muted-foreground">You receive our competitive quote</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsSubmitted(false)}>Submit Another RFQ</Button>
              <Button variant="outline" asChild>
                <a href="/catalog">Browse Products</a>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Request for Quote</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get competitive pricing for your bulk orders. Fill out the form below and our team will provide you with a
              detailed quotation within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* RFQ Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    RFQ Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Company Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          <Select
                            value={formData.country}
                            onValueChange={(value) => handleInputChange("country", value)}
                          >
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
                    </div>

                    {/* Order Requirements */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Order Requirements</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="targetQuantity">Target Quantity *</Label>
                          <Input
                            id="targetQuantity"
                            type="number"
                            value={formData.targetQuantity}
                            onChange={(e) => handleInputChange("targetQuantity", Number.parseInt(e.target.value) || 0)}
                            placeholder="Enter quantity"
                            min={1}
                            required
                          />
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
                      </div>

                      <div>
                        <Label htmlFor="targetUnitPrice">Target Unit Price (USD)</Label>
                        <Input
                          id="targetUnitPrice"
                          type="number"
                          step="0.01"
                          value={formData.targetUnitPrice || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "targetUnitPrice",
                              e.target.value ? Number.parseFloat(e.target.value) : undefined,
                            )
                          }
                          placeholder="Optional target price per unit"
                        />
                      </div>
                    </div>

                    {/* Additional Requirements */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Additional Requirements</h3>
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
                        <Label htmlFor="notes">Product Description & Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          placeholder="Describe the product you need, any special requirements, customization needs, or additional information..."
                          rows={6}
                        />
                      </div>

                      {/* File Upload Placeholder */}
                      <div>
                        <Label>Attachments</Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-4">
                            Upload specifications, drawings, or reference materials
                          </p>
                          <Button type="button" variant="outline" size="sm" disabled>
                            Choose Files
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            Max 10MB per file. PDF, DOC, JPG, PNG supported.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit RFQ
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Competitive Pricing</p>
                        <p className="text-muted-foreground">Direct factory pricing with no middleman markup</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Quality Assurance</p>
                        <p className="text-muted-foreground">Rigorous quality control and inspection processes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Fast Response</p>
                        <p className="text-muted-foreground">24-hour response time for all RFQs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Global Shipping</p>
                        <p className="text-muted-foreground">Worldwide delivery with multiple Incoterms</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Sales Team</p>
                    <p className="text-muted-foreground">sales@bulksource.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM (EST)</p>
                  </div>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-muted-foreground">Within 24 hours</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
