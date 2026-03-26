import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding started...");

  // Optional: clear old data (avoid duplicates)
  await prisma.user.deleteMany();

  // Insert data
  await prisma.user.createMany({
    data: [
      { name: "Admin", email: "admin@test.com" },
      { name: "Naruto", email: "naruto@gmail.com" },
      { name: "Sasuke", email: "sasuke@gmail.com" }
    ],
    skipDuplicates: true, // avoid crash if email exists
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });