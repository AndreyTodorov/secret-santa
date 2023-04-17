/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from "@prisma/client";
import { insertIntakeEntries, userDefaultSelect, users } from "./mocks";

const prisma = new PrismaClient();

async function main() {
  // delete existing data
  await prisma.intakeEntry.deleteMany();
  console.log("🚮 Deleted Food intakes");
  await prisma.user.deleteMany();
  console.log("🚮 Deleted Users");

  // seeding
  users.map(async (user) => {
    const createdUser = await prisma.user.create({
      data: user,
      select: userDefaultSelect,
    });
    console.log(`🌱 seeded user: ${createdUser.name ?? ""}`);

    await insertIntakeEntries(createdUser, 10, prisma);
    console.log(`🌱 seeded intakes of user ${createdUser.name ?? ""} `);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });