"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const images: GalleryImage[] = [
  { src: "/gallery/photo-1.jpg", alt: "Gallery photo 1", caption: "Replace with your photo" },
  { src: "/gallery/photo-2.jpg", alt: "Gallery photo 2", caption: "Replace with your photo" },
  { src: "/gallery/photo-3.jpg", alt: "Gallery photo 3", caption: "Replace with your photo" },
  { src: "/gallery/photo-4.jpg", alt: "Gallery photo 4", caption: "Replace with your photo" },
  { src: "/gallery/photo-5.jpg", alt: "Gallery photo 5", caption: "Replace with your photo" },
  { src: "/gallery/photo-6.jpg", alt: "Gallery photo 6", caption: "Replace with your photo" },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-sm text-primary">03.</span>
        <h2 className="text-xl font-bold text-heading md:text-2xl whitespace-nowrap">
          Gallery
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        A collection of moments and memories. Click any image to view it larger.
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {image.caption && (
                <p className="w-full px-3 pb-3 text-xs font-medium text-foreground">
                  {image.caption}
                </p>
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg border border-primary/0 transition-colors duration-300 group-hover:border-primary/40" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 z-10 rounded-md p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div
            className="relative mx-16 h-[70vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
            {images[lightboxIndex].caption && (
              <p className="absolute -bottom-8 left-0 right-0 text-center text-sm text-muted-foreground">
                {images[lightboxIndex].caption}
              </p>
            )}
            <p className="absolute -bottom-8 right-0 font-mono text-xs text-muted-foreground">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 z-10 rounded-md p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}