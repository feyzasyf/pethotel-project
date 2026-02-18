"use client";
import { useFormStatus } from "react-dom";
import Heading from "../Heading";
import { createCheckoutSession } from "@/actions";
import { Button } from "./button";

function PaymentClient({
  success,
  cancelled,
}: {
  success?: string;
  cancelled?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <main className="flex flex-col items-center space-y-10">
      <Heading>PetHotel access requires payment</Heading>
      {!success && (
        <form action={createCheckoutSession}>
          <Button disabled={pending} type="submit">
            Buy lifetime access for $299
          </Button>
        </form>
      )}
      {success && (
        <>
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

export default PaymentClient;
