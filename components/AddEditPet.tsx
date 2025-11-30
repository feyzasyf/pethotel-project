"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PetButton from "./PetButton";
import { PlusIcon } from "lucide-react";
import PetForm from "./PetForm";
import { ActionType, Pet } from "@/lib/types";
import { useState } from "react";
import { flushSync } from "react-dom";

type AddEditAction = Extract<ActionType, "add" | "edit">;

type AddEditPetProps = {
  actionType: AddEditAction;
  pet?: Pet;
};

export function AddEditPet({ actionType, pet }: AddEditPetProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleFormSubmission = () => {
    flushSync(() => setIsFormOpen(false));
  };
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <PetButton
          actionType={actionType}
          className={actionType === "add" ? "rounded-full" : ""}
        >
          {actionType === "add" ? <PlusIcon className="w-6 h-6 " /> : "Edit"}
        </PetButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add Pet" : "Edit Pet"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {" "}
            {actionType === "add"
              ? "Fill out the form to add a new pet."
              : "Fill out the form to edit an existing pet."}
          </DialogDescription>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          pet={pet}
          onFormSubmission={handleFormSubmission}
        />
      </DialogContent>
    </Dialog>
  );
}
