import Logo from "@/components/logo";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-y-5 justify-center items-center">
      <Logo />
      {children}
    </div>
  );
}
