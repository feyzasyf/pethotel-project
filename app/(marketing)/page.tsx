import Image from "next/image";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-green-400  px-8 py-8 min-h-screen flex flex-col-reverse xl:flex-row items-center justify-center gap-10">
      <Image
        src="/main.png"
        width={520}
        height={410}
        alt="PetHotel dashboard site view"
      />

      <div className="">
        <Logo />
        <h1 className="text-4xl md:text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-[600px]">
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
