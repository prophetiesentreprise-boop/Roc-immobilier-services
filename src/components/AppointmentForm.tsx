"use client";

import { useMemo, useState } from "react";
import { Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
const REASONS = [
  "Visite d'un bien",
  "Estimation sur place",
  "Mise en location / gestion locative",
  "Projet d'achat ou d'investissement",
  "Autre demande",
];

/** Premier jour valide : au moins 48h à partir de maintenant. */
function minValidDate(): string {
  const d = new Date(Date.now() + 48 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

function isSlotValid(date: string, time: string): boolean {
  if (!date || !time) return false;
  const requested = new Date(`${date}T${time}:00`);
  const minAllowed = new Date(Date.now() + 48 * 60 * 60 * 1000);
  return requested >= minAllowed;
}

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lastPayload, setLastPayload] = useState<Record<string, string> | null>(null);

  const minDate = useMemo(() => minValidDate(), []);
  const slotValid = isSlotValid(date, time);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (!slotValid) {
      setErrorMsg("Merci de choisir une date et une heure au moins 48h à l'avance.");
      return;
    }

    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: String(form.get("full_name")),
      email: String(form.get("email")),
      phone: String(form.get("phone")),
      reason: String(form.get("reason")),
      appointment_date: date,
      appointment_time: time,
      message: String(form.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setLastPayload(payload);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue.");
      setStatus("error");
    }
  }

  if (status === "done" && lastPayload) {
    const summary = `Bonjour, je viens de demander un rendez-vous sur votre site :\n- Motif : ${lastPayload.reason}\n- Date souhaitée : ${lastPayload.appointment_date} à ${lastPayload.appointment_time}\n- Nom : ${lastPayload.full_name}`;
    return (
      <div className="rounded-sm border border-vigne/40 bg-vigne/10 p-5 text-sm text-ardoise">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0 text-vigne" size={20} />
          <p>
            Votre demande de rendez-vous a été enregistrée pour le{" "}
            <strong>{lastPayload.appointment_date}</strong> à <strong>{lastPayload.appointment_time}</strong>.
            Notre équipe la confirme sous 72h ouvrées.
          </p>
        </div>
        <a
          href={whatsappLink(summary)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-fit items-center gap-2 rounded-sm bg-vigne px-4 py-2.5 text-sm font-semibold text-craie-100 hover:opacity-90"
        >
          <MessageCircle size={16} /> Confirmer aussi par WhatsApp
        </a>
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
          <label className="eyebrow mb-1 block">Téléphone / WhatsApp *</label>
          <input name="phone" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label className="eyebrow mb-1 block">E-mail *</label>
        <input type="email" name="email" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="eyebrow mb-1 block">Motif du rendez-vous *</label>
        <select name="reason" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
          {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">Date souhaitée *</label>
          <input
            type="date"
            required
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Créneau souhaité *</label>
          <select
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
          >
            <option value="">Choisir une heure</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <p className="text-xs text-encre/50">
        Merci de planifier votre rendez-vous au moins 48h à l'avance : les créneaux plus
        proches ne peuvent pas être garantis par notre équipe.
      </p>

      <div>
        <label className="eyebrow mb-1 block">Précisions (optionnel)</label>
        <textarea name="message" rows={3} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      {errorMsg && <p className="text-sm text-pinot">{errorMsg}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit text-sm">
        {status === "loading" && <Loader2 className="animate-spin" size={16} />}
        Confirmer ma demande de rendez-vous
      </button>
    </form>
  );
}
