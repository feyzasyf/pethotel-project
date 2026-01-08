import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { authAction } from "@/actions";

type AuthFormProps = {
  type: "login" | "signUp";
};
export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={authAction} className="space-y-2">
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
      <Button type="submit" className="w-full mt-4">
        {type === "login" ? "Log in" : "Sign up"}
      </Button>
    </form>
  );
}
