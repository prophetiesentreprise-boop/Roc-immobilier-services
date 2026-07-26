"use client";

import { useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  folder: string; // ex. "properties" ou "leads"
  maxPhotos?: number;
}

export function PhotoUploader({ photos, onChange, folder, maxPhotos = 12 }: PhotoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n'est pas configuré : l'ajout de photos n'est pas encore disponible.");
      return;
    }

    if (photos.length + files.length > maxPhotos) {
      setError(`Vous pouvez ajouter jusqu'à ${maxPhotos} photos maximum.`);
      return;
    }

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("property-photos").upload(path, file);
      if (uploadError) {
        setError(`Échec de l'envoi de « ${file.name} » : ${uploadError.message}`);
        continue;
      }
      const { data } = supabase.storage.from("property-photos").getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }

    onChange([...photos, ...newUrls]);
    setUploading(false);
  }

  function removePhoto(url: string) {
    onChange(photos.filter((p) => p !== url));
  }

  return (
    <div>
      <label className="eyebrow mb-1 block">Photos (jusqu'à {maxPhotos})</label>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {photos.map((url) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-sm border border-ligne">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removePhoto(url)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ardoise/80 text-craie-100 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Retirer cette photo"
            >
              <X size={13} />
            </button>
          </div>
        ))}

        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-ligne bg-craie text-encre/50 hover:border-pinot hover:text-pinot">
          {uploading ? <Loader2 size={20} className="animate-spin" /> : <ImagePlus size={20} />}
          <span className="text-[0.65rem]">Ajouter</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      {error && <p className="mt-2 text-xs text-pinot">{error}</p>}
    </div>
  );
}
