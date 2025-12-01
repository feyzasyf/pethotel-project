import type { Pet } from "../app/generated/prisma/client";

export type PetEssentials = Omit<Pet, "id" | "createdAt" | "updatedAt">;

export const actionTypes = ["add", "edit", "checkout"] as const;
export type ActionType = (typeof actionTypes)[number];

export type AddEditAction = Extract<ActionType, "add" | "edit">;

export type ActionResult<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
};
