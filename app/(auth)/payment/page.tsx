"use client";
import { createCheckoutSession } from "@/actions";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { use, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Payment({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; cancelled?: string }>;
}) {
  const { success, cancelled } = use(searchParams);

  const router = useRouter();
  const { update } = useSession();

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
        <>
          <Button
            onClick={async () => {
              await update({ forceRefresh: true });
              router.push("/app/dashboard");
            }}
          >
            Access PetHotel
          </Button>
          <p className="text-sm text-green-700">
            Payment successful! You now have lifetime access to PetHotel
          </p>
        </>
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
