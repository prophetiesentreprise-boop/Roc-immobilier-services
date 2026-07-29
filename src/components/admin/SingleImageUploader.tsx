"use client";

import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface SingleImageUploaderProps {
  imageUrl: string | null;
  onChange: (url: string | null) => void;
  label: string;
  folder: string; // ex. "logo", "agence", "team"
  bucket?: string;
  shape?: "wide" | "square";
  hint?: string;
}

export function SingleImageUploader({
  imageUrl,
  onChange,
  label,
  folder,
  bucket = "site-assets",
  shape = "wide",
  hint,
}: SingleImageUploaderProps) {
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
    const path = `${folder}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="eyebrow mb-1 block">{label}</label>
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center overflow-hidden rounded-sm border border-ligne bg-craie ${
            shape === "square" ? "h-20 w-20" : "h-20 w-40"
          }`}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-encre/40">Aucune image</span>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-ligne bg-white px-3 py-2 text-sm text-ardoise hover:border-pinot hover:text-pinot">
          {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
          {imageUrl ? "Changer" : "Ajouter"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files)} disabled={uploading} />
        </label>

        {imageUrl && (
          <button type="button" onClick={() => onChange(null)} className="flex items-center gap-1 text-xs text-pinot hover:underline">
            <X size={13} /> Retirer
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-pinot">{error}</p>}
      {hint && <p className="mt-2 text-xs text-encre/45">{hint}</p>}
    </div>
  );
}
