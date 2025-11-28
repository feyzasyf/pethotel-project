"use server";

import prisma from "./lib/prisma";
import type { Pet } from "./app/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { fail, ok } from "./lib/utils";
import { ActionResult } from "./lib/types";

export type PetInput = Omit<Pet, "id" | "createdAt" | "updatedAt">;

export async function addPet(formData: FormData): Promise<ActionResult<null>> {
  const pet: PetInput = {
    name: formData.get("name") as string,
    ownerName: formData.get("ownerName") as string,
    imageUrl:
      (formData.get("imageUrl") as string) ||
      "https://placedog.net/200/300?id=33",
    age: Number(formData.get("age")) as number,
    notes: formData.get("notes") as string,
  };
  try {
    await prisma.pet.create({
      data: pet,
    });
    revalidatePath("/app", "layout");
    return ok(null);
  } catch (error) {
    return fail("Failed to add the pet");
  }
}
