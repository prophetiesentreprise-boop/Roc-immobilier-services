interface PhotoBackdropProps {
  photoUrl?: string | null;
  fallbackGradient: string;
  overlay?: string; // classe Tailwind pour le calque assombrissant (lisibilité du texte)
  className?: string;
}

export function PhotoBackdrop({
  photoUrl,
  fallbackGradient,
  overlay = "bg-ardoise/55",
  className = "absolute inset-0",
}: PhotoBackdropProps) {
  if (photoUrl) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoUrl} alt="" className={`${className} h-full w-full object-cover`} />
        <div className={`${className} ${overlay}`} />
      </>
    );
  }

  return <div className={className} style={{ background: fallbackGradient }} />;
}
