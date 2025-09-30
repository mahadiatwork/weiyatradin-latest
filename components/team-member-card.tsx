"use client"

import Image from "next/image"
import { Mail, Phone, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface TeamMember {
  name: string
  title: string
  email: string
  phone: string
  image: string
  wechatQR?: string
}

interface TeamMemberCardProps {
  member: TeamMember
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1 text-center">
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.title}</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              title={`Email: ${member.email}`}
            >
              <Mail className="h-5 w-5 text-primary" />
            </a>
            <a
              href={`tel:${member.phone}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              title={`Phone: ${member.phone}`}
            >
              <Phone className="h-5 w-5 text-primary" />
            </a>
            {member.wechatQR ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20"
                    title="WeChat QR Code"
                  >
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Connect on WeChat</DialogTitle>
                    <DialogDescription>
                      Scan the QR code below to add {member.name} on WeChat
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-center p-6">
                    <div className="relative w-full max-w-sm aspect-square">
                      <Image
                        src={member.wechatQR}
                        alt={`${member.name} WeChat QR Code`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-muted cursor-not-allowed opacity-50"
                title="WeChat QR Code coming soon"
              >
                <MessageCircle className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
