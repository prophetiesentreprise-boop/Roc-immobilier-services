/**
 * Champ invisible destiné à piéger les robots (les vrais visiteurs ne le
 * voient ni ne le remplissent jamais). Si ce champ est rempli à la
 * réception du formulaire, la demande est silencieusement ignorée.
 */
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
    />
  );
}
