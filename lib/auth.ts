import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    ResendProvider({
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: "Histórias <no-reply@historias.app>",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        (session.user as any).plan = (user as any).plan;
        (session.user as any).trialEndsAt = (user as any).trialEndsAt;
        (session.user as any).stripeCurrentPeriodEnd = (user as any).stripeCurrentPeriodEnd;
      }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      // Primeiro login → TRIAL 14 dias
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 14);
      await db.user.update({
        where: { id: user.id! },
        data: { plan: "TRIAL", trialEndsAt },
      });
    },
  },
});

