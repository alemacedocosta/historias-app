import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserRound } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Conta</h1>

      <div className="border border-border p-8 bg-card">
        <div className="flex items-center gap-4 mb-6">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || ""}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w4 16 h-16 rounded-full bg-muted flex items-center justify-center">
              <UserRound className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Plano</p>
            <p className="font-medium">{user.plan}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Membro desde</p>
            <p className="font-medium">
              {new Date(user.criadoEm).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
