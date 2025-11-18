// import Image from "next/image";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-green-500 min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10">
      {/* insert image here */}
      {/* <Image src="" width="" height="" alt="" /> */}
      {/*end of image    */}
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care, Get lifetime
          access for $299.
        </p>
        <div className="mt-10 space-x-3">
          <Button className="rounded-full" asChild>
            <Link href="/signup">Get started</Link>
          </Button>
          <Button className="rounded-full" asChild variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
