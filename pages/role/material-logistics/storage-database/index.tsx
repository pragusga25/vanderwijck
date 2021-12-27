import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BackButton } from '@components/general/button';
import LogisticsCategorySearchBar, {
  LogisticsCategoryData,
} from '@components/Logistics/LogisticsCategorySearchBar';
import LogisticsStorageDatabase, {
  LogisticsStorageDatabaseData,
} from '@components/Logistics/Table/LogisticsStorageDatabaseTable';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Category } from '@prisma/client';
import uniq from 'lodash.uniq';

export default function Page({
  categories,
  databases,
}: {
  categories: LogisticsCategoryData[];
  databases: LogisticsStorageDatabaseData[];
}) {
  const router = useRouter();
  const [data, setData] = useState<LogisticsStorageDatabaseData[]>(databases);
  const handleSearch = (formData) => {
    const filter = formData.e;
    const categoryId: Category = filter.categoryId;
    const itemName = filter.itemName as string;

    setData(
      databases.filter(
        (d) => d.itemName === itemName && d.category === categoryId
      )
    );
  };
  return (
    <Layout
      colorType="white"
      withDropDown
      active="logistics"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-4/5 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/material-logistics')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Storage Database
          </h1>
        </div>
        <div className="w-full flex mt-10 gap-x-6">
          <LogisticsCategorySearchBar
            data={categories}
            // data={DummyCategoryData}
            onSearch={handleSearch}
          />
          <Link href="/role/material-logistics/storage-database/good-receipt">
            <div className="py-1.5 px-4 bg-astronaut hover:bg-blue-astronaut duration-300 ease-in-out cursor-pointer rounded text-white text-sm font-semibold">
              Good Receipt
            </div>
          </Link>
          <Link href="/role/material-logistics/storage-database/book-database">
            <div className="py-1.5 px-4 bg-astronaut hover:bg-blue-astronaut duration-300 ease-in-out cursor-pointer rounded text-white text-sm font-semibold">
              Book Database
            </div>
          </Link>
          <Link href="/role/material-logistics/storage-database/database-availability">
            <div className="py-1.5 px-4 bg-astronaut hover:bg-blue-astronaut duration-300 ease-in-out cursor-pointer rounded text-white text-sm font-semibold">
              Database Avail.
            </div>
          </Link>
        </div>
        <div className="h-10"></div>
        {!!data && <LogisticsStorageDatabase data={data} />}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prs = await prisma.purchaseRequest.findMany({
    select: {
      PriItemLog: {
        select: {
          parentItemLog: {
            select: {
              location: {
                select: {
                  name: true,
                },
              },
              item: {
                select: {
                  name: true,
                  category: true,
                  code: true,
                  quantity: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const items: { name: string; category: Category }[] = [];
  const databases: LogisticsStorageDatabaseData[] = [];

  prs.forEach((pr) => {
    pr.PriItemLog.forEach((it) => {
      items.push({ ...it.parentItemLog.item });
      databases.push({
        itemCode: it.parentItemLog.item.code,
        itemName: it.parentItemLog.item.name,
        qty: it.parentItemLog.item.quantity + '',
        unit:
          it.parentItemLog.item.category === Category.PIPE ? 'meter' : 'pcs',
        location: it.parentItemLog.location?.name ?? 'Warehouse Tanjung Riau',
        category: it.parentItemLog.item.category,
      });
    });
  });

  const pipeItems = items.filter((item) => item.category === Category.PIPE);

  const fittingItems = items.filter(
    (item) => item.category === Category.FITTING
  );

  const valvesItems = items.filter((item) => item.category === Category.VALVES);

  const categories: LogisticsCategoryData[] = [
    {
      categoryName: Category.PIPE,
      choices: uniq(pipeItems.map((item) => item.name)),
      categoryId: Category.PIPE,
    },
    {
      categoryName: Category.FITTING,
      choices: uniq(fittingItems.map((item) => item.name)),
      categoryId: Category.FITTING,
    },
    {
      categoryName: Category.VALVES,
      choices: uniq(valvesItems.map((item) => item.name)),
      categoryId: Category.VALVES,
    },
  ];

  return {
    props: {
      categories,
      databases,
    },
  };
};
