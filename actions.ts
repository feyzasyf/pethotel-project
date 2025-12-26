"use server";

import prisma from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { fail, ok, sleep } from "./lib/utils";
import { ActionResult } from "./lib/types";
import { petFormSchema, petIdSchema } from "./lib/validations";
import { signIn, signOut } from "./lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

//--- user actions ----

export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());
  const hashedPassword = await bcrypt.hash(String(authData.password), 10);

  await prisma.user?.create({
    data: {
      email: String(authData.email),
      hashedPassword: hashedPassword,
    },
  });

  await signIn("credentials", {
    redirect: false,
    email: String(authData.email),
    password: String(authData.password),
  });
  redirect("/app/dashboard");
}

export async function authAction(formData: FormData) {
  const type = formData.get("type");

  if (type === "login") {
    await logIn(formData);
  } else {
    await signUp(formData);
  }
}

export async function logIn(formData: FormData) {
  const authData = Object.fromEntries(formData.entries());

  const { email, password } = authData;

  await signIn("credentials", {
    redirect: false,
    email: String(email),
    password: String(password),
  });

  redirect("/app/dashboard");
}

//----pet actions ----
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
