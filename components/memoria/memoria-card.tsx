"use client";
import Image from "next/image";
import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { MemoriaComAutor } from "@/types";
import { useRouter } from "next/navigation";

interface MemoriaCardProps {
  memoria: MemoriaComAutor;
  isOwner: boolean;
}

export function MemoriaCard({ memoria, isOwner }: MemoriaCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir esta memória?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/memorias/${memoria.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Memória excluída");
      router.refresh();
    } catch {
      toast.error("Erro ao excluir memória");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="border border-border bg-card p-6 space-y-4 relative group">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground leading-tight">{memoria.titulo}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Por {memoria.autor.name ?? "Anônimo"}
          </p>
        </div>

        {isOwner && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              aria-label="Excluir memória"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Imagem */}
      {memoria.imagemUrl && (
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          <Image
            src={memoria.imagemUrl}
            alt={memoria.titulo}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
          />
        </div>
      )}

      {/* Conteúdo */}
      {memoria.conteudo && (
        <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
          {memoria.conteudo}
        </p>
      )}
    </article>
  );
}
