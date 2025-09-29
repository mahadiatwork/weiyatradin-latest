"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Media } from "@/lib/types"

interface MediaGalleryProps {
  images: string[]
  media?: Media[]
  title: string
}

export function MediaGallery({ images, media = [], title }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allMedia = [...images.map((src) => ({ type: "image" as const, src, alt: title })), ...media]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1))
  }

  const currentMedia = allMedia[currentIndex]

  return (
    <div className="space-y-4">
      {/* Main Media Display */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {currentMedia?.type === "image" ? (
          <Image
            src={currentMedia.src || "/placeholder.svg"}
            alt={currentMedia.alt || title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : currentMedia?.type === "video" ? (
          <video src={currentMedia.src} poster={currentMedia.poster} controls className="h-full w-full object-cover">
            Your browser does not support the video tag.
          </video>
        ) : null}

        {/* Navigation Arrows */}
        {allMedia.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Video Play Indicator */}
        {currentMedia?.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="rounded-full bg-black/50 p-4">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allMedia.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {allMedia.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative flex-shrink-0 aspect-square w-16 h-16 rounded-md overflow-hidden border-2 transition-colors",
                index === currentIndex ? "border-primary" : "border-transparent hover:border-muted-foreground",
              )}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt || `${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="relative h-full w-full bg-muted flex items-center justify-center">
                  {item.poster && (
                    <Image
                      src={item.poster || "/placeholder.svg"}
                      alt={`Video thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                  <Play className="absolute h-4 w-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
