interface LogoProps {
  logoUrl: string | null;
  className?: string;
  variant?: "dark" | "light";
}

export function Logo({ logoUrl, className, variant = "dark" }: LogoProps) {
  if (logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logoUrl} alt="Roc Immobilier SErvices" className={className ?? "h-10 w-auto"} />;
  }

  return (
    <span
      className={`font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight ${
        variant === "dark" ? "text-ardoise" : "text-craie-100"
      }`}
    >
      Roc <span className="text-pinot">Immobilier</span> SErvices
    </span>
  );
}
