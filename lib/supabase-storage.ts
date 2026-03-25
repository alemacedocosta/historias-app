import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const STORAGE_BUCKET = "memorias";
export const MAX_FILE_SIZE_MB = 2;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export async function uploadImagem(
  file: File,
  espacoId: string,
  userId: string
): Promise<{ url: string; tamanhoKb: number }> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`Imagem deve ter no máximo ${MAX_FILE_SIZE_MB}MB`);
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${espacoId}/${userId}/${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) throw new Error(`Erro ao fazer upload: ${error.message}`);

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    tamanhoKb: file.size / 1024,
  };
}
