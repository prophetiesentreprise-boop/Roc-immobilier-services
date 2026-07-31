"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, X, ArrowLeft } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

type NodeId =
  | "root" | "acheter" | "louer" | "estimer" | "services" | "rdv" | "autre";

interface BotOption {
  label: string;
  next?: NodeId;
  href?: string;
}

interface BotNode {
  message: string;
  options: BotOption[];
}

const TREE: Record<NodeId, BotNode> = {
  root: {
    message: `Bonjour 👋 Je suis l'assistant Roc Immobilier SErvices. Comment puis-je vous orienter ?`,
    options: [
      { label: "Je veux acheter un bien", next: "acheter" },
      { label: "Je veux louer un bien", next: "louer" },
      { label: "Je veux estimer mon bien", next: "estimer" },
      { label: "Découvrir vos services", next: "services" },
      { label: "Prendre rendez-vous", next: "rdv" },
      { label: "Autre demande", next: "autre" },
    ],
  },
  acheter: {
    message: `Très bien ! Vous pouvez consulter tous nos biens à vendre, avec filtres par ville, type et budget.`,
    options: [
      { label: "Voir les biens à vendre", href: "/acheter" },
      { label: "Prendre rendez-vous avec un conseiller", href: "/rdv" },
      { label: "⬅ Retour au menu", next: "root" },
    ],
  },
  louer: {
    message: `Parfait. Retrouvez nos biens disponibles à la location, avec les critères qui vous intéressent.`,
    options: [
      { label: "Voir les biens à louer", href: "/louer" },
      { label: "Prendre rendez-vous avec un conseiller", href: "/rdv" },
      { label: "⬅ Retour au menu", next: "root" },
    ],
  },
  estimer: {
    message: `Nous proposons une estimation gratuite et sans engagement, réalisée par notre équipe locale.`,
    options: [
      { label: "Estimer mon bien en ligne", href: "/estimer" },
      { label: "⬅ Retour au menu", next: "root" },
    ],
  },
  services: {
    message: `Roc Immobilier SErvices propose : vente, achat, location, gestion locative, investissement et accompagnement juridique.`,
    options: [
      { label: "Voir tous nos services", href: "/nos-services" },
      { label: "⬅ Retour au menu", next: "root" },
    ],
  },
  rdv: {
    message: `Les rendez-vous se planifient au moins 48h à l'avance, pour garantir la disponibilité de notre équipe.`,
    options: [
      { label: "Prendre rendez-vous", href: "/rdv" },
      { label: "⬅ Retour au menu", next: "root" },
    ],
  },
  autre: {
    message: `Pas de souci, un conseiller peut vous répondre directement — par WhatsApp ou via le formulaire de contact.`,
    options: [
      { label: "Écrire sur WhatsApp", href: "__whatsapp__" },
      { label: "Aller à la page Contact", href: "/contact" },
      { label: "⬅ Retour au menu", next: "root" },
    ],
  },
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState<NodeId>("root");
  const [history, setHistory] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: TREE.root.message },
  ]);

  const node = TREE[nodeId];

  function choose(option: BotOption) {
    setHistory((h) => [...h, { from: "user", text: option.label }]);
    if (option.next) {
      setNodeId(option.next);
      setTimeout(() => {
        setHistory((h) => [...h, { from: "bot", text: TREE[option.next as NodeId].message }]);
      }, 200);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="flex h-[28rem] w-80 flex-col overflow-hidden rounded-sm border border-ligne bg-craie-100 shadow-2xl">
          <div className="flex items-center justify-between bg-ardoise px-4 py-3 text-craie-100">
            <p className="text-sm font-semibold">Assistant Roc Immobilier SErvices</p>
            <button onClick={() => setOpen(false)} aria-label="Fermer l'assistant">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {history.map((h, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-sm px-3 py-2 text-sm ${
                  h.from === "bot"
                    ? "bg-craie text-encre"
                    : "ml-auto bg-pinot text-craie-100"
                }`}
              >
                {h.text}
              </div>
            ))}
          </div>

          <div className="border-t border-ligne p-3">
            <div className="flex flex-col gap-2">
              {nodeId !== "root" && (
                <button
                  onClick={() => choose({ label: "⬅ Retour au menu", next: "root" })}
                  className="flex items-center gap-1 text-xs text-encre/50 hover:text-pinot"
                >
                  <ArrowLeft size={12} /> Retour au menu
                </button>
              )}
              <div className="grid gap-1.5">
                {node.options.map((option) =>
                  option.href ? (
                    option.href === "__whatsapp__" ? (
                      <a
                        key={option.label}
                        href={whatsappLink("Bonjour Roc Immobilier SErvices, j'ai une question.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setHistory((h) => [...h, { from: "user", text: option.label }])}
                        className="rounded-sm border border-ligne bg-craie px-3 py-2 text-left text-xs font-medium text-ardoise hover:border-pinot hover:text-pinot"
                      >
                        {option.label}
                      </a>
                    ) : (
                      <Link
                        key={option.label}
                        href={option.href}
                        onClick={() => setHistory((h) => [...h, { from: "user", text: option.label }])}
                        className="rounded-sm border border-ligne bg-craie px-3 py-2 text-left text-xs font-medium text-ardoise hover:border-pinot hover:text-pinot"
                      >
                        {option.label}
                      </Link>
                    )
                  ) : (
                    <button
                      key={option.label}
                      onClick={() => choose(option)}
                      className="rounded-sm border border-ligne bg-craie px-3 py-2 text-left text-xs font-medium text-ardoise hover:border-pinot hover:text-pinot"
                    >
                      {option.label}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Ouvrir l'assistant Roc Immobilier SErvices"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-pinot text-craie-100 shadow-lg hover:bg-pinot-600"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
