"use client";

import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";
import PetButton from "./PetButton";
import { AddEditPet } from "./AddEditPet";
import { checkoutPet } from "@/actions";
import { useTransition } from "react";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col w-full h-full">
      {!selectedPet ? (
        <div className="flex h-full justify-center items-center">
          <EmptyView />
        </div>
      ) : (
        <>
          <TopBar pet={selectedPet} />
          <OtherInfo pet={selectedPet} />

          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

type Props = {
  pet: Pet;
};
function TopBar({ pet }: Props) {
  const { handleCheckoutPet } = usePetContext();
  const [isPending, startTransition] = useTransition();

  const deletePet = async (id: string) => {
    await checkoutPet(id);
    handleCheckoutPet();
  };
  return (
    <div className="flex items-center bg-white py-5 px-8 border-b border-gray-200">
      <Image
        src={pet.imageUrl}
        alt="Selected pet image"
        width={75}
        height={75}
        className="w-[75px] h-[75px] rounded-full object-cover"
      />
      <h2 className="ml-5 text-3xl font-semibold leading-7">{pet.name}</h2>
      <div className="ml-auto flex  space-x-2">
        <AddEditPet actionType="edit" pet={pet} />
        <PetButton
          actionType="checkout"
          disabled={isPending}
          onClick={() => startTransition(() => deletePet(pet.id))}
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ pet }: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-xs font-medium uppercase text-gray-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-gray-800">{pet.ownerName}</p>
      </div>
      <div>
        <h3 className="text-xs font-medium uppercase text-gray-700">Age</h3>
        <p className="mt-1 text-lg text-gray-800">{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="bg-white px-6 py-5 rounded-md mb-9 mx-6 border border-black/8 h-full">
      {pet.notes}
    </section>
  );
}

function EmptyView() {
  return <p className="text-2xl font-medium">No pet selected</p>;
}
