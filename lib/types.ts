import { Session } from "next-auth";
import type { Pet } from "@prisma/client";

export type PetEssentials = Omit<
  Pet,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export const actionTypes = ["add", "edit", "checkout"] as const;
export type ActionType = (typeof actionTypes)[number];

export type AddEditAction = Extract<ActionType, "add" | "edit">;

export type ActionResult<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
};

export type AuthenticatedSession = Session & { user: { id: string } };

export type AuthFormProps = {
  type: "login" | "signUp";
};
