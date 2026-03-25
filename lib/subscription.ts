import type { User } from "@prisma/client";

export function isTrialActive(user: Pick<User, "plan" | "trialEndsAt">): boolean {
  if (user.plan !== "TRIAL") return false;
  if (!user.trialEndsAt) return false;
  return new Date(user.trialEndsAt) > new Date();
}

export function isSubscribed(user: Pick<User, "plan" | "stripeCurrentPeriodEnd">): boolean {
  if (user.plan !== "PRO") return false;
  if (!user.stripeCurrentPeriodEnd) return false;
  return new Date(user.stripeCurrentPeriodEnd) > new Date();
}

export function hasAccess(user: Pick<User, "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd">): boolean {
  return isTrialActive(user) || isSubscribed(user);
}

export function daysLeftInTrial(user: Pick<User, "plan" | "trialEndsAt">): number {
  if (!isTrialActive(user) || !user.trialEndsAt) return 0;
  const diff = new Date(user.trialEndsAt).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export const PLAN_LIMITS = {
  FREE: {
    espacos: 0,
    memoriasPorEspaco: 0,
    storagePerEspacoMb: 0,
    podeConvidar: false,
    podeExportar: false,
  },
  TRIAL: {
    espacos: Infinity,
    memoriasPorEspaco: Infinity,
    storagePerEspacoMb: 5000,
    podeConvidar: true,
    podeExportar: true,
  },
  PRO: {
    espacos: Infinity,
    memoriasPorEspaco: Infinity,
    storagePerEspacoMb: 5000,
    podeConvidar: true,
    podeExportar: true,
  },
} as const;
