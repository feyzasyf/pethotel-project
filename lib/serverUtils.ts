import "server-only";

import { auth } from "./auth";
import { assertIsAuthenticated } from "./guards";
import { Pet, User } from "@/app/generated/prisma/client";
import prisma from "./prisma";
import Stripe from "stripe";

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

export async function handleCheckoutSessionCompleted(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  const userId = event.data.object.metadata?.userId;

  if (!userId) {
    throw new Error("User ID is missing ");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { hasAccess: true },
  });
}
