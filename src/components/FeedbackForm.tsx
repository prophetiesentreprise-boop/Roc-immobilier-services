"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle2, Flag } from "lucide-react";

export function FeedbackForm({ leadId }: { leadId: string }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [disputed, setDisputed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setErrorMsg("Merci de choisir une note avant d'envoyer.");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, rating, comment, disputed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-vigne/40 bg-vigne/10 p-5 text-sm text-ardoise">
        <CheckCircle2 className="mt-0.5 shrink-0 text-vigne" size={20} />
        <p>Merci, votre avis a bien été enregistré. Notre équipe en tient compte.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div>
        <p className="eyebrow mb-2">Votre note</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            >
              <Star
                size={30}
                className={(hoverRating || rating) >= n ? "text-colombage" : "text-ligne"}
                fill={(hoverRating || rating) >= n ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="eyebrow mb-1 block">Commentaire (optionnel)</label>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Dites-nous comment s'est passé le traitement de votre demande..."
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        />
      </div>

      <label className="flex items-start gap-2 text-sm text-encre/80">
        <input type="checkbox" checked={disputed} onChange={(e) => setDisputed(e.target.checked)} className="mt-1" />
        <span className="flex items-center gap-1">
          <Flag size={14} className="text-pinot" /> Je conteste le traitement de ma demande (un problème n'est pas résolu)
        </span>
      </label>

      {errorMsg && <p className="text-sm text-pinot">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit text-sm">
        {status === "loading" && <Loader2 className="animate-spin" size={16} />}
        Envoyer mon avis
      </button>
    </form>
  );
}
