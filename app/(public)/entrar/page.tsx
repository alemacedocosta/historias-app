import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "A/components/ui/button";

export default async function EntrarPage({
  searchParams,
}: {
  searchParams: { convite?: string };
}) {
  const session = await auth();
  const convite = searchParams.convite;

  if (!session?.user) {
    redirect(`/login?callbackUrl=/entrar${convite ? `?convite=${convite}` : ""}`);
  }

  if (convite) {
    redirect(`/api/convites?codigo=${convite}`);
  }

  redirect("/dashboard");
}
