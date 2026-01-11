"use client";
import { createCheckoutSession } from "@/actions";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { use, useTransition } from "react";

function Payment({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; cancelled?: string }>;
}) {
  const { success, cancelled } = use(searchParams);

  const [isPending, startTransition] = useTransition();

  return (
    <main className="flex flex-col items-center space-y-10">
      <Heading>PetHotel access requires payment</Heading>
      {!success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await createCheckoutSession();
            });
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}
      {success && (
        <p className="text-sm text-green-700">
          Payment successful! You now have lifetime access to PetHotel
        </p>
      )}
      {cancelled && (
        <p className="text-sm text-red-700">
          Payment cancelled.You can try again.
        </p>
      )}
    </main>
  );
}

export default Payment;
