import { createClient } from "./supabase/server";
import { BACKGROUND_ZONES } from "./background-zones";

export { BACKGROUND_ZONES };
export type { BackgroundZone } from "./background-zones";

export async function getBackgroundImages(): Promise<Record<string, string | null>> {
  const supabase = await createClient();
  if (!supabase) return {};

  const { data, error } = await supabase.from("background_images").select("key, image_url");
  if (error || !data) return {};

  const map: Record<string, string | null> = {};
  for (const row of data) map[row.key] = row.image_url;
  return map;
}
