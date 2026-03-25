import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TrialBanner } from "@/components/paywall/trial-banner";
import { daysLeftInTrial, isTrialActive } from "@/lib/subscription";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = session.user as any;
  const showTrialBanner = isTrialActive(user);
  const daysLeft = showTrialBanner ? daysLeftInTrial(user) : 0;

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {showTrialBanner && <TrialBanner daysLeft={daysLeft} />}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
