"use client";

import { addPet, checkoutPet, editPet } from "@/actions";
import { ActionResult, Pet } from "@/lib/types";
import { createContext, startTransition, useOptimistic, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  handleChangeSelectedPetId: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<ActionResult<null>>;
  handleEditPet: (
    petId: string,
    updatedPet: Omit<Pet, "id">
  ) => Promise<ActionResult<null>>;
  handleCheckoutPet: (id: string) => Promise<void>;
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

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    const tempPet = { ...newPet, id: new Date().toISOString() };
    setOptimisticPets({ type: "add", payload: tempPet });
    const result = await addPet(newPet);

    return result;
  };

  const handleEditPet = async (petId: string, updatedPet: Omit<Pet, "id">) => {
    setOptimisticPets({ type: "edit", payload: { id: petId, updatedPet } });
    const result = await editPet(updatedPet, petId);

    return result;
  };

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: string) => {
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
