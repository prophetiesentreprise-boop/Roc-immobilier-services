import { Logo } from "./Logo";
import { RooflineMotif } from "./RooflineMotif";

interface PageLetterheadProps {
  logoUrl: string | null;
  eyebrow: string;
  tagline: string;
}

export function PageLetterhead({ logoUrl, eyebrow, tagline }: PageLetterheadProps) {
  return (
    <div
      className="relative overflow-hidden py-12 text-craie-100"
      style={{ background: "linear-gradient(120deg, #262F82 0%, #FE5100 140%)" }}
    >
      <RooflineMotif className="absolute bottom-0 left-0 w-full h-14 text-craie-100/10" />
      <div className="container-roc relative flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Logo logoUrl={logoUrl} variant="light" className="h-12 w-auto max-w-[200px] object-contain" />
        <div className="sm:text-right">
          <p className="eyebrow text-craie-100/60">{eyebrow}</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg italic text-craie-100/90">
            {tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
