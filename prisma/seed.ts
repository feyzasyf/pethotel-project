import prisma from "../lib/prisma";

import bcrypt from "bcrypt";

const userData = {
  email: "example@gmail.com",
  hashedPassword: "",
  pets: {
    create: [
      {
        name: "Benjamin",
        ownerName: "John Doe",
        imageUrl: "https://placedog.net/500/280",
        age: 2,
        notes:
          "Doesn't like to be touched on the belly. Plays well with other dogs.",
      },
      {
        name: "Richard",
        ownerName: "Josephine Dane",
        imageUrl: "https://placedog.net/500/280",
        age: 5,
        notes: "Needs medication twice a day.",
      },
      {
        name: "Anna",
        ownerName: "Frank Doe",
        imageUrl: "https://placedog.net/500/280",
        age: 4,
        notes: "Allergic to chicken.",
      },
    ],
  },
};

export async function main() {
  const hashedPassword = await bcrypt.hash("example", 10);
  userData.hashedPassword = hashedPassword;

  await prisma.user.create({
    data: userData,
  });
}

main();
