"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface CarouselImage {
  src: string;
  alt: string;
}

interface PhotoCarouselProps {
  images: CarouselImage[];
  /** Tailwind classes for the container (sizing, rounding, aspect ratio). */
  className?: string;
  /** Auto-rotation interval in ms. */
  interval?: number;
  showDots?: boolean;
  sizes?: string;
  priority?: boolean;
  /** Dim overlay on top of the images (useful for text over photos). */
  overlay?: boolean;
}

export default function PhotoCarousel({
  images,
  className = "",
  interval = 4000,
  showDots = true,
  sizes = "100vw",
  priority = false,
  overlay = false,
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={priority && i === 0}
          sizes={sizes}
          quality={90}
          className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {overlay && <div className="absolute inset-0 bg-dark/40" />}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
