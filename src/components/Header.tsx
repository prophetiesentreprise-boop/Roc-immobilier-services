"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./Logo";

const NAV = [
  { href: "/agence", label: "L'agence" },
  { href: "/acheter", label: "Acheter" },
  { href: "/louer", label: "Louer" },
  { href: "/estimer", label: "Estimer mon bien" },
  { href: "/nos-services", label: "Nos services" },
  { href: "/contact", label: "Contact" },
];

export function Header({ logoUrl }: { logoUrl: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ligne bg-craie-100/95 backdrop-blur">
      <div className="container-roc flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo logoUrl={logoUrl} className="h-11 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ardoise/80 hover:text-pinot transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-2 text-sm font-semibold text-ardoise">
            <Phone size={16} className="text-pinot" />
            {siteConfig.phoneDisplay}
          </a>
          <Link href="/rdv" className="btn-primary text-sm">
            Prendre RDV
          </Link>
        </div>

        <button
          className="lg:hidden text-ardoise"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ligne bg-craie-100">
          <div className="container-roc flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-ardoise border-b border-ligne/60 last:border-none"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/rdv" className="btn-primary mt-4 text-sm" onClick={() => setOpen(false)}>
              Prendre RDV
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
