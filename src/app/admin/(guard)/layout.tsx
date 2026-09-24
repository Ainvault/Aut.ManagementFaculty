import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/admin";
import { AdminShell } from "@/components/organisms/admin/AdminShell";

// Authoritative admin guard + shell.
// - Verifies the session against the database for every /admin page
//   (login lives outside this route group, see src/app/admin/login).
// - Proxy only does a fast cookie-presence redirect; this is the real check.

export default async function AdminGuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();
  if (!session) {
    redirect("/admin/login");
  }

  return <AdminShell userName={session.name}>{children}</AdminShell>;
}
