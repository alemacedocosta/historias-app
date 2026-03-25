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
        Novo espaço*       </Button>
    );
  }
