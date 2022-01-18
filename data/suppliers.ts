import { Category } from '@prisma/client';

export const suppliers = [
  { id: 1, category: [Category.PIPE], name: 'Nam Leong', country: 'Singapore' },
  {
    id: 2,
    category: [Category.PIPE],
    name: 'Asia Enterprises',
    country: 'Singapore',
  },
  {
    id: 3,
    category: [Category.FITTING, Category.VALVES],
    name: 'PT. Mulya Acetek Perkasa',
    country: 'Indonesia',
  },
  {
    id: 4,
    category: [Category.FITTING, Category.VALVES],
    name: 'PT. Global Benua Bajatma',
    country: 'Indonesia',
  },
  {
    id: 5,
    category: [Category.FITTING, Category.VALVES],
    name: 'PT. Asia Pratama',
    country: 'Indonesia',
  },
  {
    id: 6,
    category: [Category.AUX_MACHINERY],
    name: 'PT. Partner Usaha Bersama',
    country: 'Indonesia',
  },
  {
    id: 7,
    category: [Category.AUX_MACHINERY],
    name: 'PT. Batam Niaga Perkasa',
    country: 'Indonesia',
  },
];
