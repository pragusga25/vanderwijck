// Run with: npx ts-node ./prisma/seedItemsOfSuppliers.ts

import { items, locations } from '../data';
import prisma from '../lib/prisma';

// const prisma = new PrismaClient();

const seed = async () => {
  await prisma.location.createMany({ data: locations });
  // for (const supplier of suppliers) {
  //   for (const item of items) {
  //     if ((supplier.category as string[]).includes(item.category)) {
  //       await prisma.itemsOnSuppliers.create({
  //         data: {
  //           supplier: { connect: { id: supplier.id } },
  //           item: { connect: { code: item.code } },
  //         },
  //       });
  //     }
  //   }
  // }
};

seed()
  .then(() => {})
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// export default seed;
