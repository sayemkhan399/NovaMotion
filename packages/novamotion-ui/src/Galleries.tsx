import React, { useState } from "react";
import type { DuoFlipImage } from "./DuoFlip.js";

export type GalleryImagesProps = React.HTMLAttributes<HTMLDivElement> & {
  images: DuoFlipImage[];
};

function GalleryImage({
  image,
  className = "",
}: {
  image: DuoFlipImage;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={image.alt}
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url("${image.src}")` }}
    />
  );
}

export function MasonryGallery({
  images,
  className = "",
  ...props
}: GalleryImagesProps) {
  const [selectedImage, setSelectedImage] = useState<DuoFlipImage | null>(null);

  if (!images.length) return null;

  return (
    <div className={`relative w-full ${className}`} {...props}>
      <div className="grid aspect-[4/3] grid-cols-3 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            aria-label={`Open ${image.alt}`}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl bg-cover bg-center transition-transform hover:scale-[1.03] ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
            style={{ backgroundImage: `url("${image.src}")` }}
          />
        ))}
      </div>
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedImage(null);
          }}
        >
          <button
            type="button"
            aria-label="Close image preview"
            className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#18181B]"
            onClick={() => setSelectedImage(null)}
          >
            Close
          </button>
          <GalleryImage
            image={selectedImage}
            className="h-[min(75vh,640px)] w-full max-w-4xl rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}

export function ThumbnailCarousel({
  images,
  className = "",
  ...props
}: GalleryImagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) return null;

  const activeImage = images[activeIndex % images.length];
  const move = (offset: number) => {
    setActiveIndex((current) => (current + offset + images.length) % images.length);
  };

  return (
    <div
      role="region"
      aria-label="Image carousel"
      className={`w-full ${className}`}
      {...props}
    >
      <div className="relative">
        <GalleryImage
          image={activeImage}
          className="aspect-[16/10] rounded-2xl shadow-sm"
        />
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => move(-1)}
          className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => move(1)}
          className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow"
        >
          ›
        </button>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            aria-label={`Show ${image.alt}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={`h-12 w-16 shrink-0 rounded-lg bg-cover bg-center ${
              index === activeIndex ? "ring-2 ring-[#18181B] ring-offset-2" : ""
            }`}
            style={{ backgroundImage: `url("${image.src}")` }}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-medium text-[#52525B]">
        {activeImage.label ?? activeImage.alt}
      </p>
    </div>
  );
}
