"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const events = [
  {
    id: 1,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/1.jpg",
    alt: "Event 1"
  },
  {
    id: 2,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/2.jpg",
    alt: "Event 2"
  },
  {
    id: 3,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/3.jpg",
    alt: "Event 3"
  },
  {
    id: 4,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/4.jpg",
    alt: "Event 4"
  },
  {
    id: 5,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/5.jpg",
    alt: "Event 5"
  },
  {
    id: 6,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/6.jpg",
    alt: "Event 6"
  },
  {
    id: 7,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/7.jpg",
    alt: "Event 7"
  },
  {
    id: 8,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/8.jpg",
    alt: "Event 8"
  },
  {
    id: 9,
    src: "https://cms.weiyatrading.com/wp-content/uploads/2025/06/9-scaled.jpg",
    alt: "Event 9"
  }
]

export function EventsGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our participation in trade shows, exhibitions, and industry events
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedImage(event.id)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <Image
                src={event.src}
                alt={event.alt}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-foreground shadow-lg">
                  View Image
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-black/95 border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={events[selectedImage - 1].src}
                alt={events[selectedImage - 1].alt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
