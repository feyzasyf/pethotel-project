"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { AuthFormProps } from "@/lib/types";
import { authAction } from "@/actions";
import { Button } from "./ui/button";
import { useActionState } from "react";

export default function AuthForm({ type }: AuthFormProps) {
  const [authState, dispatchAuth, isPending] = useActionState(authAction, null);

  return (
    <form action={dispatchAuth} className="space-y-2">
      <input type="hidden" name="type" value={type} />
      <div className="space-y-2 my-4">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required maxLength={100} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          maxLength={30}
        />
      </div>
      <Button type="submit" className="w-full mt-4" disabled={isPending}>
        {type === "login" ? "Log in" : "Sign up"}
      </Button>
      {authState?.error && (
        <p className="text-red-500 mt-2">{authState.error}</p>
      )}
    </form>
  );
}
