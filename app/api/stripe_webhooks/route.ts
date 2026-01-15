import { handleCheckoutSessionCompleted } from "@/lib/serverUtils";
import { stripe } from "@/lib/stripe";
import { Stripe } from "stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const bodyData = await request.text();
  let event: Stripe.Event;
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!signature || !endPointSecret) {
    return Response.json({ error: "Webhook misconfigured" }, { status: 400 });
  }

  //verify webhook actually came from stripe

  try {
    event = stripe.webhooks.constructEvent(bodyData, signature, endPointSecret);
  

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.log("Webhook verification failed", error);
    return Response.json(null, { status: 400 });
  }

  //fulfill order

  return Response.json(null, { status: 200 });
}
