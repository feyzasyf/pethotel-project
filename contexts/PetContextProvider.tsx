"use client";

import { addPet, checkoutPet, editPet } from "@/actions";
import { ActionResult, PetEssentials } from "@/lib/types";
import { Pet } from "@/app/generated/prisma/client";
import { createContext, startTransition, useOptimistic, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<ActionResult<null>>;
  handleEditPet: (
    petId: Pet["id"],
    updatedPet: PetEssentials
  ) => Promise<ActionResult<null>>;
  handleCheckoutPet: (id: Pet["id"]) => Promise<void>;
  selectedPet: Pet | undefined;
  petCount: number;
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { type, payload }): Pet[] => {
      switch (type) {
        case "add":
          return [...state, payload];
        case "edit":
          return state.map((pet) =>
            pet.id === payload.id ? { ...pet, ...payload.updatedPet } : pet
          );
        case "delete":
          return state.filter((pet) => pet.id !== payload);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const petCount = optimisticPets?.length || 0;

  const handleAddPet = async (newPet: PetEssentials) => {
    const tempPet = { ...newPet, id: new Date().toISOString() };
    startTransition(() => {
      setOptimisticPets({ type: "add", payload: tempPet });
    });
    const result = await addPet(newPet);

    return result;
  };

  const handleEditPet = async (petId: Pet["id"], updatedPet: PetEssentials) => {
    startTransition(() => {
      setOptimisticPets({ type: "edit", payload: { id: petId, updatedPet } });
    });
    const result = await editPet(updatedPet, petId);

    return result;
  };

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: Pet["id"]) => {
    startTransition(() => {
      setOptimisticPets({ type: "delete", payload: petId });
      setSelectedPetId(null);
    });
    await checkoutPet(petId);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleAddPet,
        handleEditPet,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        selectedPet,
        petCount,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
