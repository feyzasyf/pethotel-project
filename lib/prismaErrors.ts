import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function isUniqueConstraintError(err: unknown) {
  return err instanceof PrismaClientKnownRequestError && err.code === "P2002";
}
