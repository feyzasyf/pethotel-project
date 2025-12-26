import { AuthenticatedSession } from "./types";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export function assertIsAuthenticated(
  session: Session | null
): asserts session is AuthenticatedSession {
  if (!session?.user) {
    redirect("/login");
  }
}
