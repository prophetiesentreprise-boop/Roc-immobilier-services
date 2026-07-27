"use client";

import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface LogoUploaderProps {
  logoUrl: string | null;
  onChange: (url: string | null) => void;
}

export function LogoUploader({ logoUrl, onChange }: LogoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n'est pas configuré.");
      return;
    }

    setUploading(true);
    const path = `logo/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("site-assets").upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="eyebrow mb-1 block">Logo de l'agence</label>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-40 items-center justify-center rounded-sm border border-ligne bg-craie">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt="Logo actuel" className="max-h-16 max-w-36 object-contain" />
          ) : (
            <span className="text-xs text-encre/40">Aucun logo</span>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-ligne bg-white px-3 py-2 text-sm text-ardoise hover:border-pinot hover:text-pinot">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
          {logoUrl ? "Changer le logo" : "Ajouter un logo"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files)} disabled={uploading} />
        </label>

        {logoUrl && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex items-center gap-1 text-xs text-pinot hover:underline"
          >
            <X size={13} /> Retirer
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-pinot">{error}</p>}
      <p className="mt-2 text-xs text-encre/45">
        Format recommandé : PNG avec fond transparent, environ 400×120 px.
      </p>
    </div>
  );
}
