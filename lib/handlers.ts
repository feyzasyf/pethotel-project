import Stripe from "stripe";
import prisma from "./prisma";

export async function handleCheckoutSessionCompleted(
  event: Stripe.CheckoutSessionCompletedEvent,
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
