"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export function FiltersBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get("ville") ?? "");
  const [category, setCategory] = useState(searchParams.get("type") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");

  function apply(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("ville", city);
    if (category) params.set("type", category);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    router.push(`${pathname}?${params.toString()}`);
  }

  function reset() {
    setCity("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    router.push(pathname);
  }

  return (
    <form
      onSubmit={apply}
      className="mb-10 grid gap-3 rounded-sm border border-ligne bg-craie-100 p-4 sm:grid-cols-2 lg:grid-cols-6 lg:items-end"
    >
      <div className="lg:col-span-2">
        <label className="eyebrow mb-1 block">Ville</label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Colmar, Wintzenheim…"
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        />
      </div>
      <div>
        <label className="eyebrow mb-1 block">Type de bien</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        >
          <option value="">Tous</option>
          <option value="Maison">Maison</option>
          <option value="Appartement">Appartement</option>
          <option value="Terrain">Terrain</option>
          <option value="Local commercial">Local commercial</option>
        </select>
      </div>
      <div>
        <label className="eyebrow mb-1 block">Prix min.</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="0"
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        />
      </div>
      <div>
        <label className="eyebrow mb-1 block">Prix max.</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Sans limite"
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1 text-sm">
          <SlidersHorizontal size={15} /> Filtrer
        </button>
        <button type="button" onClick={reset} className="btn-ghost text-sm">
          Réinitialiser
        </button>
      </div>
    </form>
  );
}
