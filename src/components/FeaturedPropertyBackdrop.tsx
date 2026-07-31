"use client";

import { useEffect, useState } from "react";

interface FeaturedPropertyBackdropProps {
  photos: string[];
  fallbackPhotoUrl?: string | null;
  fallbackGradient: string;
}

export function FeaturedPropertyBackdrop({ photos, fallbackPhotoUrl, fallbackGradient }: FeaturedPropertyBackdropProps) {
  const [index, setIndex] = useState(0);
  const hasPhotos = photos.length > 0;

  useEffect(() => {
    if (photos.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [photos.length]);

  if (hasPhotos) {
    return (
      <div className="absolute inset-0">
        {photos.map((url, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-ardoise/30" />
      </div>
    );
  }

  if (fallbackPhotoUrl) {
    return (
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fallbackPhotoUrl} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ardoise/35" />
      </div>
    );
  }

  return <div className="absolute inset-0" style={{ background: fallbackGradient }} />;
}
