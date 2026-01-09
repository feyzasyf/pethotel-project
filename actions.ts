"use server";

import prisma from "./lib/prisma";
import { revalidatePath } from "next/cache";
import { fail, ok, sleep } from "./lib/utils";
import { ActionResult } from "./lib/types";
import { authSchema, petFormSchema, petIdSchema } from "./lib/validations";
import { auth, signIn, signOut } from "./lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { checkAuth, getPetByPetId } from "./lib/serverUtils";
import { isUniqueConstraintError } from "./lib/prismaErrors";

//--- user actions ----
export async function logOut() {
  await signOut({ redirectTo: "/" });
}

export async function signUp(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return fail("Invalid form data");
  }

  //convert formData to a plain object
  const formDataEntries = Object.fromEntries(formData.entries());

  //validation
  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return fail("Invalid email or password");
  }

  const { email, password } = validatedFormData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user?.create({
      data: {
        email: email,
        hashedPassword: hashedPassword,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return fail("A user with this email already exists");
    }
  }

  await signIn("credentials", {
    redirect: false,
    email: email,
    password: password,
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

export async function logIn(formData: unknown) {
  if (!(formData instanceof FormData)) {
    return fail("Invalid form data");
  }

  const validatedFormData = authSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFormData.success) {
    return fail("Invalid email or password");
  }
  const { email, password } = validatedFormData.data;

  const result = await signIn("credentials", {
    redirect: false,
    email: String(email),
    password: String(password),
  });

  redirect("/app/dashboard");
}

//----pet actions ----
export async function addPet(pet: unknown): Promise<ActionResult<null>> {
  await sleep(1000);

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const validatedPet = petFormSchema.safeParse(pet);

  if (validatedPet.success === false) {
    return fail("Invalid pet data");
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: { connect: { id: session?.user?.id } },
      },
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

  //authentication check
  const session = await checkAuth();

  const validatedId = petIdSchema.safeParse(id);
  const validatedPet = petFormSchema.safeParse(newPet);
  if (validatedPet.success === false || validatedId.success === false) {
    return fail("Invalid pet data");
  }

  //authorization check (user owns pet)
  const pet = await getPetByPetId(validatedId.data);

  if (!pet) {
    return fail("Pet not found");
  }

  if (pet.userId !== session.user.id) {
    return fail("You are not authorized to delete this pet");
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

  //authentication check
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  //validation
  const validatedId = petIdSchema.safeParse(petId);

  if (validatedId.success === false) {
    return fail("Invalid pet data");
  }

  //authorization check (user owns pet)
  const pet = await getPetByPetId(validatedId.data);

  if (!pet) {
    return fail("Pet not found");
  }

  if (pet.userId !== session.user.id) {
    return fail("You are not authorized to delete this pet");
  }

  //database mutation
  try {
    await prisma.pet.delete({
      where: { id: validatedId.data },
    });
    revalidatePath("/app", "layout");
  } catch (error) {
    return fail("Failed to delete the pet");
  }
}
