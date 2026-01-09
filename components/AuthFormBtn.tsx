"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import type { AuthFormProps } from "@/lib/types";

function AuthFormBtn({ type }: AuthFormProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-4" disabled={pending}>
      {type === "login" ? "Log in" : "Sign up"}
    </Button>
  );
}

export default AuthFormBtn;
