import ContentBlock from "@/components/ContentBlock";
import Heading from "@/components/Heading";

export default function Account() {
  return (
    <main>
      <Heading className="text-white my-8 ">Your account</Heading>
      <ContentBlock className="h-[500px] flex justify-center items-center">
        <p>Logged in as...</p>
      </ContentBlock>
    </main>
  );
}
