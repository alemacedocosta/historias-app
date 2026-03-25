"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error();
    } catch {
      toast.error("Erro ao abrir pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full h-[72px] text-lg font-bold bg-foreground text-background hover:bg-foreground/90"
    >
      {loading ? "Abrindo pagamento..." : "Assinar agora — R$ 19,90/mês"}
    </Button>
  );
}
