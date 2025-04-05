import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@ckd.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Utilisateur créé !");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

  
