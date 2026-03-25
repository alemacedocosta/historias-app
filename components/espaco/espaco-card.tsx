import Link from "next/link";
import { ChevronRight, Users, BookOpen } from "lucide-react";
import type { MemberRole } from "@prisma/client";

interface EspacoCardProps {
  espaco: {
    id: string;
    nome: string;
    _count: { memorias: number; membros: number };
  };
  papel: MemberRole;
}

export function EspacoCard({ espaco, papel }: EspacoCardProps) {
  return (
    <Link
      href={`/espaco/${espaco.id}`}
      className="block border border-border bg-card p-6 hover:bg-secondary transition-colors group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground truncate">{espaco.nome}</h2>
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {espaco._count.memorias}{" "}
              {espaco._count.memorias === 1 ? "memória" : "memórias"}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {espaco._count.membros}{" "}
              {espaco._count.membros === 1 ? "pessoa" : "pessoas"}
            </span>
          </div>
          {papel === "ADMIN" && (
            <span className="inline-block mt-2 text-xs font-medium bg-secondary px-2 py-1">
              Admin
            </span>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground shrink-0 mt-1 transition-colors" />
      </div>
    </Link>
  );
}
