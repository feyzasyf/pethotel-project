// tests/vitest.setup.ts
import { config } from "dotenv";

// load env FIRST
config({ path: ".env.test", override: true });

// now prisma can be imported safely in tests
import prisma from "@/lib/prisma";
import { vi } from "vitest";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not loaded correctly!");
}

vi.mock("server-only", () => ({}));
