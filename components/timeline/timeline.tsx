"use client";
import { YearMarker } from "./year-marker";
import { MemoriaCard } from "@/components/memoria/memoria-card";
import type { MemoriaComAutor } from "@/types";

interface TimelineProps {
  anos: number[];
  memoriasPorAno: Record<number, MemoriaComAutor[]>;
  userId: string;
}

export function Timeline({ anos, memoriasPorAno, userId }: TimelineProps) {
  return (
    <div className="relative">
      {/* Linha vertical da timeline */}
      <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-border" aria-hidden="true" />

      <div className="space-y-12">
        {anos.map((ano, index) => (
          <section
            key={ano}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
            aria-label={`Ano ${ano}`}
          >
            <YearMarker ano={ano} />
            <div className="pl-14 space-y-6">
              {memoriasPorAno[ano].map((memoria) => (
                <MemoriaCard
                  key={memoria.id}
                  memoria={memoria}
                  isOwner={memoria.autorId === userId}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
