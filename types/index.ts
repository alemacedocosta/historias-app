import type { User, Espaco, Memoria, Membro, Convite, Plan, MemberRole } from "@prisma/client";

export type { User, Espaco, Memoria, Membro, Convite, Plan, MemberRole };

export type EspacoComDetalhes = Espaco & {
  _count: { memorias: number; membros: number };
  membros: (Membro & { user: Pick<User, "id" | "name" | "email" | "image"> })[];
};

export type MemoriaComAutor = Memoria & {
  autor: Pick<User, "id" | "name" | "image">;
};

export type MemoriasPorAno = {
  ano: number;
  memorias: MemoriaComAutor[];
};
