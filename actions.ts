"use server";

import prisma from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { fail, ok, sleep } from "./lib/utils";
import { ActionResult, PetEssentials } from "./lib/types";

export async function addPet(pet: PetEssentials): Promise<ActionResult<null>> {
  await sleep(1000);
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

export async function editPet(
  newPet: PetEssentials,
  id: string
): Promise<ActionResult<null>> {
  await sleep(1000);
  try {
    await prisma.pet.update({
      where: { id: id },
      data: newPet,
    });
    revalidatePath("/app", "layout");
    return ok(null);
  } catch (error) {
    return fail("Failed to update the pet");
  }
}

export async function checkoutPet(id: string) {
  await sleep(1000);
  try {
    await prisma.pet.delete({
      where: { id: id },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return fail("Failed to delete the pet");
  }
}
