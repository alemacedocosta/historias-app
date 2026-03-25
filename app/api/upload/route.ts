import { NextRequest, NextResponse } from "next/server";
import { auth } from "A/lib/auth";
import { db } from "A/lib/db";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const espacoId = formData.get("espacoId") as string;

  if (!file || !espacoId) {
    return NextResponse.json({ error: "Arquivo e espacoId obrigatórios" }, { status: 400 });
  }

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Imagem deve ter no máximo 2MB" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${espacoId}/${session.user.id}/${Date.now()}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabaseAdmin.storage
    .from("memorias")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage
    .from("memorias")
    .getPublicUrl(data.path);

  // Atualizar storage usado do espaço
  const tamanhoMb = file.size / (1024 * 1024);
  await db.espaco.update({
    where: { id: espacoId },
    data: { armazenamentoUsadoMb: { increment: tamanhoMb } },
  });

  return NextResponse.json({ url: urlData.publicUrl, tamanhoKb: file.size / 1024 });
}
