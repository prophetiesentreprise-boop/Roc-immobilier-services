import { ScrollText } from "lucide-react";

/**
 * Transforme le texte saisi dans le back-office en blocs affichables :
 * - une ligne commençant par "## " devient un sous-titre
 * - chaque paragraphe séparé par une ligne vide devient un <p>
 * Volontairement simple : pas de gras/italique/liens à gérer côté admin.
 */
export function ArticleContent({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <div>
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h3 key={i} className="mt-6 flex items-center gap-2 font-semibold text-ardoise first:mt-0">
              <ScrollText size={16} className="text-pinot shrink-0" /> {block.replace(/^##\s+/, "")}
            </h3>
          );
        }
        return (
          <p key={i} className="mt-2 text-sm leading-relaxed text-encre/75">
            {block}
          </p>
        );
      })}
    </div>
  );
}
