"use client";

import { useEffect, useState } from "react";

interface AutoSlideshowProps {
  photos: string[];
  alt?: string;
  className?: string;
  intervalMs?: number;
}

/** Fait défiler automatiquement une liste de photos, où qu'elle soit affichée sur le site. */
export function AutoSlideshow({ photos, alt = "", className = "h-full w-full object-cover", intervalMs = 3500 }: AutoSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % photos.length), intervalMs);
    return () => clearInterval(timer);
  }, [photos.length, intervalMs]);

  if (photos.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {photos.map((url, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={url}
          src={url}
          alt={alt}
          className={`absolute inset-0 transition-opacity duration-1000 ${className}`}
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
