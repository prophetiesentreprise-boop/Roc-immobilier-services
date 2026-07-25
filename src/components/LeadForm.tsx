"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  type: "estimation" | "contact" | "visite" | "alerte";
  propertyId?: string;
  submitLabel?: string;
  showAddressField?: boolean;
}

export function LeadForm({
  type,
  propertyId,
  submitLabel = "Envoyer ma demande",
  showAddressField = false,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      type,
      full_name: form.get("full_name"),
      email: form.get("email"),
      phone: form.get("phone"),
      message: showAddressField
        ? `Adresse du bien à estimer : ${form.get("address")}\n\n${form.get("message") ?? ""}`
        : form.get("message"),
      property_id: propertyId ?? null,
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
          Merci, votre demande a bien été transmise à notre équipe. Un conseiller ROC
          Immobilier revient vers vous sous 24h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">Nom complet *</label>
          <input name="full_name" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Téléphone</label>
          <input name="phone" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label className="eyebrow mb-1 block">E-mail *</label>
        <input type="email" name="email" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      {showAddressField && (
        <div>
          <label className="eyebrow mb-1 block">Adresse du bien à estimer *</label>
          <input name="address" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      )}

      <div>
        <label className="eyebrow mb-1 block">Message</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
          placeholder="Décrivez votre projet en quelques mots…"
        />
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit text-sm">
        {status === "loading" && <Loader2 className="animate-spin" size={16} />}
        {submitLabel}
      </button>

      {status === "error" && (
        <p className="text-sm text-pinot">
          Une erreur est survenue. Merci de réessayer ou de nous appeler directement.
        </p>
      )}
    </form>
  );
}
