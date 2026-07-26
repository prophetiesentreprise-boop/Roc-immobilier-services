"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [kind, setKind] = useState<"vente" | "location">("vente");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("ville", city);
    if (category) params.set("type", category);
    router.push(`/${kind === "vente" ? "acheter" : "louer"}?${params.toString()}`);
  }

  return (
    <div className="relative rounded-sm border border-ligne bg-craie-100 p-2 shadow-[0_24px_50px_-24px_rgba(32,43,56,0.35)]">
      <div className="flex gap-1 border-b border-ligne p-2">
        {(["vente", "location"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`px-4 py-2 text-sm font-semibold rounded-sm transition-colors ${
              kind === k ? "bg-ardoise text-craie-100" : "text-ardoise/70 hover:bg-craie"
            }`}
          >
            {k === "vente" ? "Acheter" : "Louer"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-2 p-2 sm:grid-cols-[1.4fr_1fr_auto]">
        <input
          type="text"
          placeholder="Ville ou commune (ex. Cocody)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-sm border border-ligne bg-white px-3 py-3 text-sm text-encre placeholder:text-encre/40"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-sm border border-ligne bg-white px-3 py-3 text-sm text-encre"
        >
          <option value="">Tout type de bien</option>
          <option value="Maison">Maison</option>
          <option value="Appartement">Appartement</option>
          <option value="Terrain">Terrain</option>
          <option value="Local commercial">Local commercial</option>
        </select>
        <button type="submit" className="btn-primary">
          <Search size={16} /> Rechercher
        </button>
      </form>
    </div>
  );
}
