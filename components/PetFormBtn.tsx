import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function PetFromBtn({
  actionType,
  pending,
}: {
  actionType: "add" | "edit";
  pending: boolean;
}) {
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
