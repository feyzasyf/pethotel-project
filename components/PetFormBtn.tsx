import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFromBtn({
  actionType,
}: {
  actionType: "add" | "edit";
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="rounded-full justify-self-end"
    >
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}
