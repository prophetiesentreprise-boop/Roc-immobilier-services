"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { BACKGROUND_ZONES } from "@/lib/background-zones";
import { SingleImageUploader } from "./SingleImageUploader";

interface Props {
  initialImages: Record<string, string | null>;
}

export function BackgroundImagesForm({ initialImages }: Props) {
  const router = useRouter();
  const [images, setImages] = useState<Record<string, string | null>>(initialImages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setLoading(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n'est pas configuré.");
      setLoading(false);
      return;
    }

    const rows = BACKGROUND_ZONES.map((zone) => ({
      key: zone.key,
      image_url: images[zone.key] ?? null,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("background_images").upsert(rows, { onConflict: "key" });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSaved(true);
    router.refresh();
  }

  const servicesZones = BACKGROUND_ZONES.filter((z) => z.key.startsWith("service_"));
  const otherZones = BACKGROUND_ZONES.filter((z) => !z.key.startsWith("service_"));

  return (
    <div className="grid max-w-2xl gap-6">
      {otherZones.map((zone) => (
        <div key={zone.key} className="rounded-sm border border-ligne bg-craie-100 p-5">
          <SingleImageUploader
            imageUrl={images[zone.key] ?? null}
            onChange={(url) => setImages((prev) => ({ ...prev, [zone.key]: url }))}
            label={zone.label}
            folder={`backgrounds/${zone.key}`}
            hint={zone.hint}
          />
        </div>
      ))}

      <div className="rounded-sm border border-ligne bg-craie-100 p-5">
        <p className="eyebrow mb-4">Page « Nos services » — les 6 blocs</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {servicesZones.map((zone) => (
            <SingleImageUploader
              key={zone.key}
              imageUrl={images[zone.key] ?? null}
              onChange={(url) => setImages((prev) => ({ ...prev, [zone.key]: url }))}
              label={zone.label.replace("Nos services — bloc ", "")}
              folder={`backgrounds/${zone.key}`}
              shape="square"
            />
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-pinot">{error}</p>}
      {saved && !error && <p className="text-sm text-vigne">Arrière-plans enregistrés avec succès.</p>}

      <button type="button" onClick={handleSave} disabled={loading} className="btn-primary w-fit text-sm">
        {loading && <Loader2 className="animate-spin" size={16} />}
        Enregistrer tous les arrière-plans
      </button>
    </div>
  );
}
