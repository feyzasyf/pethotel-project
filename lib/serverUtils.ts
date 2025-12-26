import "server-only";

import { auth } from "./auth";
import { assertIsAuthenticated } from "./guards";

export async function checkAuth() {
  const session = await auth();

  assertIsAuthenticated(session);
  return session;
}
