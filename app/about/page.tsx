import { Users, Award, Globe, Shield, Mail, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">About weiyatrading</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're a leading B2B sourcing platform connecting businesses with quality manufacturers worldwide. Since
              2015, we've helped over 10,000 companies streamline their procurement processes and scale their
              operations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50M+</div>
              <div className="text-sm text-muted-foreground">Products Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Verified Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              To simplify global sourcing by connecting businesses with trusted manufacturers, providing transparent
              pricing, quality assurance, and reliable logistics solutions that enable companies to scale efficiently
              and compete globally.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quality First</h3>
                  <p className="text-sm text-muted-foreground">
                    Rigorous quality control ensures every product meets international standards.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Customer Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Dedicated support teams provide personalized service for every client.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">
                    Worldwide network of suppliers and logistics partners for seamless delivery.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Excellence</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuous improvement and innovation in sourcing and logistics solutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Leadership Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              At weiyatrading, we believe that strong leadership builds stronger partnerships. Our dedicated team brings
              a wealth of experience, innovation, and global insight to ensure your success.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Chairman */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EtmL9TLSV0r38FJF0M8B8QAhIV6FAb.png"
                        alt="Li Guoping - Chairman"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Li Guoping</h3>
                    <p className="text-sm text-muted-foreground mb-4">Chairman</p>
                    <div className="flex flex-col gap-2 w-full">
                      <a
                        href="mailto:1311067735@qq.com"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="truncate">1311067735@qq.com</span>
                      </a>
                      <a
                        href="tel:+8615138088555"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>+86 151 3808 8555</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chief of Operations */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o33Kw9etB8u2LTiMsQYzH8eNDQeN1v.png"
                        alt="Md Estihad Faysal - Chief of Operations"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Md Estihad Faysal</h3>
                    <p className="text-sm text-muted-foreground mb-4">Chief of Operations</p>
                    <div className="flex flex-col gap-2 w-full">
                      <a
                        href="mailto:aihe1524@gmail.com"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="truncate">aihe1524@gmail.com</span>
                      </a>
                      <a
                        href="tel:+8613124054279"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>+86 131 2405 4279</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chief of Technology */}
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden bg-muted">
                      <Image
                        src="/md-mahadi-hasan-cto.jpg"
                        alt="MD Mahadi Hasan - Chief of Technology"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">MD Mahadi Hasan</h3>
                    <p className="text-sm text-muted-foreground mb-4">Chief of Technology</p>
                    <div className="flex flex-col gap-2 w-full">
                      <a
                        href="mailto:mahadi.hanshan@gmail.com"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="truncate">mahadi.hanshan@gmail.com</span>
                      </a>
                      <a
                        href="tel:+8801867884361"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>+880 186 788 4361</span>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Story */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2015 by a team of sourcing and logistics experts, weiyatrading was born from the frustration of
              dealing with unreliable suppliers, hidden costs, and complex international trade processes. We saw an
              opportunity to create a transparent, efficient platform that would democratize access to global
              manufacturing.
            </p>
            <p className="text-muted-foreground mb-4">
              Starting with a small network of verified suppliers in China, we've grown to become a trusted partner for
              businesses of all sizes. Our platform now connects buyers with manufacturers across Asia, offering
              everything from consumer electronics to industrial equipment.
            </p>
            <p className="text-muted-foreground">
              Today, weiyatrading continues to innovate in the B2B sourcing space, leveraging technology to make
              international trade more accessible, transparent, and efficient for businesses worldwide.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
