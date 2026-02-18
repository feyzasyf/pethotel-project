import PaymentClient from "@/components/ui/PaymentClient";

async function Payment({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; cancelled?: string }>;
}) {
  const { success, cancelled } = await searchParams;

  return <PaymentClient success={success} cancelled={cancelled} />;
}

export default Payment;
