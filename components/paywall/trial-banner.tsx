"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";

interface TrialBannerProps {
  daysLeft: number;
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-foreground text-background px-4 py-3 flex items-center justify-between gap-4">
      <p className="text-sm font-medium">
        {daysLeft > 1
          ? `Vocà tem ${daysLeft} dias restantes na sua avaliação gratuita.`
          : "Último dia da sua avaliação gratuita."}{" "}
        <Link href="/settings/billing" className="underline font-bold hover:no-underline">
          Fazer upgrade
        </Link>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Fechar aviso"
        className="shrink-0 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
