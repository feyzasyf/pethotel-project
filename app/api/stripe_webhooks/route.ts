import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  //verify webhook actually came from stripe
  //....
  //fulfill order
  await prisma.user.update({
    where: { email: body.data.object.customer_email },
    data: { hasAccess: true },
  });

  return Response.json(null, { status: 200 });
}
