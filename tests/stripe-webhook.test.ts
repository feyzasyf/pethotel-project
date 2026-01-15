import { config } from "dotenv";
config({ path: ".env.test" }); //

import { describe, it, expect, afterEach } from "vitest";
import prisma from "@/lib/prisma";
import { handleCheckoutSessionCompleted } from "@/lib/handlers";
import { Stripe } from "stripe";

describe("Stripe webhook", () => {
  afterEach(async () => {
    await prisma.pet.deleteMany({});
    await prisma.user.deleteMany({});
  });
  it("marks user as paid", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        hashedPassword: "test-hash",
        hasAccess: false,
      },
    });

    const mockEvent = {
      type: "checkout.session.completed",
      data: {
        object: {
          metadata: {
            userId: user.id,
          },
        },
      },
    } as unknown as Stripe.CheckoutSessionCompletedEvent;

    await handleCheckoutSessionCompleted(mockEvent);

    const updated = await prisma.user.findUnique({ where: { id: user.id } });
    expect(updated?.hasAccess).toBe(true);
  });
});
