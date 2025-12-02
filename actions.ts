"use server";

import prisma from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { fail, ok, sleep } from "./lib/utils";
import { ActionResult } from "./lib/types";
import { petFormSchema, petIdSchema } from "./lib/validations";

export async function addPet(pet: unknown): Promise<ActionResult<null>> {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet);
  if (validatedPet.success === false) {
    return fail("Invalid pet data");
  }
  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
    revalidatePath("/app", "layout");
    return ok(null);
  } catch (error) {
    return fail("Failed to add the pet");
  }
}

export async function editPet(
  newPet: unknown,
  id: unknown
): Promise<ActionResult<null>> {
  await sleep(1000);

  const validatedId = petIdSchema.safeParse(id);
  const validatedPet = petFormSchema.safeParse(newPet);
  if (validatedPet.success === false || validatedId.success === false) {
    return fail("Invalid pet data");
  }
  try {
    await prisma.pet.update({
      where: { id: validatedId.data },
      data: validatedPet.data,
    });
    revalidatePath("/app", "layout");
    return ok(null);
  } catch (error) {
    return fail("Failed to update the pet");
  }
}

export async function checkoutPet(petId: unknown) {
  await sleep(1000);

  const validatedId = petIdSchema.safeParse(petId);

  if (validatedId.success === false) {
    return fail("Invalid pet data");
  }

  try {
    await prisma.pet.delete({
      where: { id: validatedId.data },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return fail("Failed to delete the pet");
  }
}
