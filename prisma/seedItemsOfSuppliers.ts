// Run with: npx ts-node ./prisma/seedItemsOfSuppliers.ts

import {
    items,
    suppliers,
  } from '../data';
  import prisma from '../lib/prisma';
  
  // const prisma = new PrismaClient();
  
  const seed = async () => {  
    await prisma.supplier.createMany({ data: suppliers });
    for (const supplier of suppliers) {
      for (const item of items) {
        if ((supplier.category as string[]).includes(item.category)) {
          await prisma.itemsOnSuppliers.create({
            data: {
              supplier: { connect: { id: supplier.id } },
              item: { connect: { code: item.code } },
            },
          });
        }
      }
    }
  };
  
  seed()
    .then(() => console.log('Seeding for items of suppliers success!'))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  
  // export default seed;
  