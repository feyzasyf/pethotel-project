import "server-only";

import { auth } from "./auth";
import { assertIsAuthenticated } from "./guards";
import { Pet, User } from "@/app/generated/prisma/client";
import prisma from "./prisma";

export async function checkAuth() {
  const session = await auth();

  assertIsAuthenticated(session);
  return session;
}

export async function getPetByPetId(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: { id: petId },
  });
  return pet;
}

export async function getPetsByUserId(userId: Pet["userId"]) {
  const pets = await prisma.pet.findMany({
    where: { userId: userId },
  });
  return pets;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
}
