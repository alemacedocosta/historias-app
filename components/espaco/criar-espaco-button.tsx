"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CriarEspacoButton() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/espacos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim() }),
      });
      if (!res.ok) throw new Error();
      toast.success("Espaço criado com sucesso!");
      setOpen(false);
      setNome("");
      router.refresh();
    } catch {
      toast.error("Erro ao criar espaço. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="h-[56px] px-6 text-base font-bold bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Novo espaço
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 flex items-center justify-center p-4">
      <div className="bg-background border border-border p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Criar espaço familiar</h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-base font-medium">
              Nome do espaço
            </Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Família Silva"
              className="h-[56px] text-lg"
              maxLength={80}
              required
              autoFocus
            />
            <p className="text-sm text-muted-foreground">
              Você pode alterar o nome depois.
            </p>
          </div>
          <Button
            type="submit"
            disabled={loading || !nome.trim()}
            className="w-full h-[72px] text-lg font-bold bg-foreground text-background hover:bg-foreground/90"
          >
            {loading ? "Criando..." : "Criar espaço"}
          </Button>
        </form>
      </div>
    </div>
  (}
("�
  r
 