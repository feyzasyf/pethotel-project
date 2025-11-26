"use server";

import prisma from "./lib/prisma";
import type { Pet } from "./app/generated/prisma/client";

export type PetInput = Omit<Pet, "id" | "createdAt" | "updatedAt">;
export async function addPet(formData: FormData): Promise<void> {
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
  } catch (error) {
    throw new Error("Failed to add pet");
  }
}
