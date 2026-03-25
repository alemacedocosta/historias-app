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
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
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
      toast.success("MemÃ³ria salva!");
      handleClose();
      router.refresh();
    } catch {
      toast.error("Erro ao salvar memÃ³ria. Tente novamente.");
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
        Nova memÃ³ria
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background border border-border p-8 w-full max-w-lg my-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Registrar memÃ³ria</h2>
          <button onClick={handleClose} aria-label="Fechar" className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TÃ­tulo */}
          <div className="space-y-2">
            <Label htmlFor="titulo" className="text-base font-medium">
              TÃ­tulo da memÃ³ria <span className="text-destructive">*</span>
            </Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Viagem para a praia em famÃ­lia"
              className="h-[56px] text-lg"
              maxLength={120}
              required
              autoFocus
            />
          </div>

          {/* Ano */}
          <div className="space-y-2">
            <Label htmlFor="ano" className="text-base font-medium">
              Ano em que aconteceu <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ano"
              type="number"
              value={ano}
              onChange={(e) => setAno(parseInt(e.target.value))}
              min={1900}
              max={currentYear}
              className="h-[56px] text-lg"
              required
            />
            <p className="text-sm text-muted-foreground">
              Qual ano esse acontecimento ocorreu? Ex: 1985, 2003, {currentYear}
            </p>
          </div>

          {/* Texto */}
          <div className="space-y-2">
            <Label htmlFor="conteudo" className="text-base font-medium">
              Conte a histÃ³ria
            </Label>
            <Textarea
              id="conteudo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Escreva o que vocÃª lembra sobre esse momento..."
              className="text-base min-h-[120px] resize-y"
              maxLength={5000}
            />
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Foto (opcional)</Label>
            <label className="flex items-center justify-center gap-3 border-2 border-dashed border-border p-6 cursor-pointer hover:bg-secondary transition-colors">
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-base text-muted-foreground">
                {imagem ? imagem.name : "Clique para selecionar uma foto"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setImagem(e.target.files?.[0] ?? null)}
              />
            </label>
            {imagem && (
              <p className="text-sm text-muted-foreground">
                {(imagem.size / 1024 / 1024).toFixed(1)}MB â mÃ¡ximo 2MB
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || !titulo.trim()}
            className="w-full h-[72px] text-lg font-bold bg-foreground text-background hover:bg-foreground/90"
          >
            {loading ? "Salvando..." : "Salvar memÃ³ria"}
          </Button>
        </form>
      </div>
    </div>
  );
}
