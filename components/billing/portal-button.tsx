"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function PortalButton() {
  const [loading, setLoading] = useState(false);

  async function handlePortal() {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error();
    } catch {
      toast.error("Erro ao abrir portal. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handlePortal}
      disabled={loading}
      variant="outline"
      className="h-[72px] px-8 text-base font-bold border-2 border-foreground"
    >
      {loading ? "Abrindo..." : "Gerenciar assinatura"}
    </Button>
  );
}
