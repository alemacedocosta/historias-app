"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NovaMemoriaButtonProps {
  espacoId: string;
}

const currentYear = new Date().getFullYear();

export function NovaMemoriaButton({ espacoId }: NovaMemoriaButtonProps) {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [ano, setAno] = useState(currentYear);
  const [imagem, setImagem] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleClose() {
    setOpen(false);
    setTitulo("");
    setConteudo("");
    setAno(currentYear);
    setImagem(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) return;
    setLoading(true);

    try {
      let imagemUrl: string | undefined;
      let imagemTamanhoKb: number | undefined;

      // Upload de imagem se selecionada
      if (imagem) {
        const formData = new FormData();
        formData.append("file", imagem);
        formData.append("espacoId", espacoId);
        const uploadRes = await fetch/0 ", { �xmethod: "POST", body: formData });
        if (!uploadRes.ok) throw new Error("Erro ao fazer upload da imagem");
        const uploadData = await uploadRes.json();
        imagemUrl = uploadData.url;
        imagemTamanhoKb = uploadData.tamanhoKb;
      }

      const res = await fetch("/api/memorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          espacoId,
          titulo: titulo.trim(),
          conteudo: conteudo.trim() || undefined,
          anoAcontecimento: ano,
          imagemUrl,
          imagemTamanhoKb,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success("Memória salva!");
      handleClose();
      router.refresh();
    } catch {
      toast.error("Erro ao salvar memória. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="h-[48px] px-4 text-base font-bold bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Nova memória
      </Button>
    );
  }
