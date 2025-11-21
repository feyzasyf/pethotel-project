import { PrismaClient, Prisma } from "../app/generated/prisma/client";
//import { PrismaPg } from "@prisma/adapter-pg";
// import "dotenv/config";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });

const prisma = new PrismaClient({
  //adapter,
});

const petData: Prisma.PetCreateInput[] = [
  {
    name: "Benjamin",
    ownerName: "John Doe",
    imageUrl: "https://placedog.net/200/300?id=21",
    age: 2,
    notes:
      "Doesn't like to be touched on the belly. Plays well with other dogs.",
  },
  {
    name: "Richard",
    ownerName: "Josephine Dane",
    imageUrl: "https://placedog.net/200/300?id=25",
    age: 5,
    notes: "Needs medication twice a day.",
  },
  {
    name: "Anna",
    ownerName: "Frank Doe",
    imageUrl: "https://placedog.net/200/300?id=54",
    age: 4,
    notes: "Allergic to chicken.",
  },
];

export async function main() {
  for (const pet of petData) {
    await prisma.pet.create({ data: pet });
  }
}

main();
