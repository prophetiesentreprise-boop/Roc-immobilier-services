import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  accent: string;
}

export function StatCard({ icon: Icon, value, label, accent }: StatCardProps) {
  return (
    <div className="card-lift group relative overflow-hidden rounded-sm border border-craie-100/15 bg-ardoise-700/60 p-6">
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 transition-transform duration-300 group-hover:scale-125"
        style={{ background: accent }}
      />
      <Icon size={22} style={{ color: accent }} className="relative" />
      <p className="relative mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-craie-100">
        {value}
      </p>
      <p className="relative mt-1 text-xs text-craie-100/65">{label}</p>
    </div>
  );
}
