import ContentBlock from "@/components/ContentBlock";
import Heading from "@/components/Heading";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";

export default async function Account() {
  const session = await auth();
  const { email } = session!.user!;

  return (
    <main>
      <Heading className="text-white my-8 ">Your account</Heading>
      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as {email}</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
}
