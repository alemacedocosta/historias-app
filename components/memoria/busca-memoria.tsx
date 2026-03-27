"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface BuscaMemoriaProps {
  espacoId: string;
}

export function BuscaMemoria({ espacoId }: BuscaMemoriaProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${pathname}?busca=${encodeURIComponent(query.trim())}`);
    }
    setOpen(false);
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="h-[48px] w-[48px] p-0 border-border"
        aria-label="Buscar memórias"
      >
        <Search className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 x-50 bg-foreground/20 flex items-start justify-center pt-24 px-4">
      <div className="bg-background border border-border p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Buscar memórias</h2>
          <button onClick={() => setOpen(false)} aria-label="Fechar">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, ano ou palavra..."
            className="h-[56px] text-lg flex-1"
          />
          <Button
            type="submit"
            className="h-[56px] px-6 bg-foreground text-background hover:bg-foreground/90"
          >
            Buscar
          </Button>
        </form>
        <p className="text-sm text-muted-foreground mt-3">
          Busque por título, texto ou nome de pessoa mencionada.
        </p>
      </div>
    </div>
  );
}
