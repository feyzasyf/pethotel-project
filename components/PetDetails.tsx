"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  if (!selectedPet) return null;

  return (
    <section className="w-full h-full">
      {/* Header with pet image and name */}
      <div className="flex items-center bg-white py-5 px-8 border-b border-gray-200">
        <Image
          src={selectedPet.imageUrl}
          alt="Selected pet image"
          width={75}
          height={75}
          className="w-[75px] h-[75px] rounded-full object-cover"
        />
        <h2 className="ml-5 text-3xl font-semibold leading-7">
          {selectedPet.name}
        </h2>
      </div>

      {/* Owner info / Age */}
      <div className="flex justify-around py-10 px-5 text-center bg-red-500 border">
        <div>
          <h3 className="text-xs font-medium uppercase text-gray-700">
            Owner name
          </h3>
          <p className="mt-1 text-lg text-gray-800">{selectedPet.ownerName}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase text-gray-700">Age</h3>
          <p className="mt-1 text-lg text-gray-800">{selectedPet.age}</p>
        </div>
      </div>

      {/* Notes section */}
      <section className="bg-white px-6 py-5 rounded-md mb-9 mx-6 block">
        {selectedPet.notes}
      </section>
    </section>
  );
}
