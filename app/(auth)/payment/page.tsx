"use client";
import { createCheckoutSession } from "@/actions";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Payment({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; cancelled?: string }>;
}) {
  const { success, cancelled } = use(searchParams);

  const router = useRouter();
  const { data: session, update, status } = useSession();

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!success) return;

    if (session?.user?.hasAccess) {
      router.push("/app/dashboard");
      return;
    }

    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;
      await update({ forceRefresh: true });

      if (attempts >= 5) {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [success, session, update, router]);

  return (
    <main className="flex flex-col items-center space-y-10">
      <Heading>PetHotel access requires payment</Heading>
      {!success && (
        <Button
          disabled={isPending}
          onClick={() => {
            setIsPending(true);
            createCheckoutSession();
          }}
        >
          Buy lifetime access for $299
        </Button>
      )}
      {success && (
        <>
          {/* <Button
            disabled={status === "loading"}
            onClick={async () => {
              await update({ forceRefresh: true });
              router.push("/app/dashboard");
            }}
          >
            Access PetHotel
          </Button> */}
          <p className="text-sm text-green-700">
            Payment successful 🎉 We’re finalizing your access. This may take a
            few seconds.
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
