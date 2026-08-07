"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Honeypot } from "@/components/Honeypot";
import { PhotoUploader } from "@/components/PhotoUploader";
import { PROPERTY_CATEGORIES } from "@/lib/types";

export function EstimateForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [photos, setPhotos] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    const details = [
      `Adresse / quartier du bien : ${form.get("address")}`,
      `Type de bien : ${form.get("property_type")}`,
      `Surface approximative : ${form.get("surface")} m²`,
      `Nombre de pièces : ${form.get("rooms")}`,
      `État général : ${form.get("condition")}`,
      `Raison de l'estimation : ${form.get("reason")}`,
      form.get("message") ? `Message complémentaire : ${form.get("message")}` : null,
    ].filter(Boolean).join("\n");

    const payload = {
      type: "estimation",
      full_name: form.get("full_name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: details,
      photos,
      website: form.get("website"), // champ piège anti-spam
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-vigne/40 bg-vigne/10 p-5 text-sm text-ardoise">
        <CheckCircle2 className="mt-0.5 shrink-0 text-vigne" size={20} />
        <p>
          Merci ! Votre demande d'estimation a bien été transmise. Un conseiller Roc
          Immobilier SErvices vous recontacte sous 72h ouvrées pour affiner l'analyse et
          convenir d'un rendez-vous d'expertise si besoin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">Nom complet *</label>
          <input name="full_name" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Téléphone / WhatsApp *</label>
          <input name="phone" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label className="eyebrow mb-1 block">E-mail *</label>
        <input type="email" name="email" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="eyebrow mb-1 block">Adresse ou quartier du bien *</label>
        <input name="address" required placeholder="Ex. Cocody, Riviera 3" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="eyebrow mb-1 block">Type de bien *</label>
          <select name="property_type" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            {PROPERTY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow mb-1 block">Surface (m²) *</label>
          <input type="number" name="surface" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Nombre de pièces</label>
          <input type="number" name="rooms" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">État général du bien *</label>
          <select name="condition" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            <option value="Neuf / récent">Neuf / récent</option>
            <option value="Bon état">Bon état</option>
            <option value="À rafraîchir">À rafraîchir</option>
            <option value="Gros travaux nécessaires">Gros travaux nécessaires</option>
          </select>
        </div>
        <div>
          <label className="eyebrow mb-1 block">Raison de l'estimation</label>
          <select name="reason" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            <option value="Projet de vente à court terme">Projet de vente à court terme</option>
            <option value="Simple curiosité / suivi de patrimoine">Simple curiosité / suivi de patrimoine</option>
            <option value="Succession ou partage">Succession ou partage</option>
            <option value="Projet d'investissement">Projet d'investissement</option>
          </select>
        </div>
      </div>

      <div>
        <label className="eyebrow mb-1 block">Précisions utiles (optionnel)</label>
        <textarea
          name="message"
          rows={3}
          placeholder="Points forts particuliers, dépendances, titre foncier disponible…"
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        />
      </div>

      <div className="rounded-sm border border-ligne bg-craie p-4">
        <PhotoUploader photos={photos} onChange={setPhotos} folder="leads" maxPhotos={8} />
        <p className="mt-2 text-xs text-encre/45">
          Quelques photos du bien aident notre équipe à affiner l'estimation avant même
          la visite d'expertise.
        </p>
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit text-sm">
        {status === "loading" && <Loader2 className="animate-spin" size={16} />}
        Demander mon estimation
      </button>

      {status === "error" && (
        <p className="text-sm text-pinot">Une erreur est survenue. Merci de réessayer ou de nous écrire sur WhatsApp.</p>
      )}
    </form>
  );
}
