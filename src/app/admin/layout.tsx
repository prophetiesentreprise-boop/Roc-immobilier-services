import Link from "next/link";
import { LayoutDashboard, Building2, Inbox, ExternalLink } from "lucide-react";
import { SignOutButton } from "@/components/admin/SignOutButton";

export const metadata = { title: "Espace professionnel — ROC Immobilier" };

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/biens", label: "Biens", icon: Building2 },
  { href: "/admin/leads", label: "Demandes reçues", icon: Inbox },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-craie">
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-ligne bg-ardoise p-6 text-craie-100 lg:min-h-screen lg:border-b-0 lg:border-r">
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold">
            ROC <span className="text-colombage">Back-office</span>
          </p>
          <nav className="mt-8 flex flex-row gap-2 lg:flex-col">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-craie-100/80 hover:bg-ardoise-700 hover:text-craie-100"
              >
                <Icon size={16} /> {label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-2 border-t border-craie-100/15 pt-6 text-sm">
            <Link href="/" className="flex items-center gap-2 text-craie-100/70 hover:text-craie-100">
              <ExternalLink size={15} /> Voir le site public
            </Link>
            <SignOutButton />
          </div>
        </aside>

        <div className="p-6 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
