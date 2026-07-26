"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoCarousel({ photos, alt }: { photos: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) return null;

  function prev() {
    setIndex((i) => (i === 0 ? photos.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === photos.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="relative h-72 overflow-hidden sm:h-96">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photos[index]} alt={`${alt} — photo ${index + 1}`} className="h-full w-full object-cover" />

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-craie-100/90 text-ardoise hover:bg-craie-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-craie-100/90 text-ardoise hover:bg-craie-100"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Aller à la photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-craie-100" : "w-1.5 bg-craie-100/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
