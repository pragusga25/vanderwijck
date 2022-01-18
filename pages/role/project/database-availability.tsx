import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import { useState } from 'react';
import ProjectItemCard, {
  ProjectItemCardProps,
} from '@components/Project/ProjectItemCard';
import { LogisticsCategoryData } from '@components/Logistics/LogisticsCategorySearchBar';
import LogisticsCategorySearchBar from '@components/Logistics/LogisticsCategorySearchBar';
import { GetServerSideProps } from 'next';
import { Category } from '@prisma/client';
import prisma from '@lib/prisma';
import uniq from 'lodash.uniq';
import { dateStr } from '@utils/funcs';
import { STATUS } from '@constants/index';

export default function Page({
  categories,
  data: myData,
}: {
  categories: LogisticsCategoryData[];
  data: ProjectItemCardProps[];
}) {
  const router = useRouter();
  const dummyOnSearch = (data) => {
    const name = data.e.itemName as string;
    const item = myData.find((d) => d.itemName === name);
    setData(item);
  };
  const [data, setData] = useState<ProjectItemCardProps>(null);
  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-4/5 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Database Availability
          </h1>
        </div>
        <div className="h-16"></div>
        <LogisticsCategorySearchBar
          data={categories}
          onSearch={dummyOnSearch}
        />
        <div className="h-10"></div>
        {!!data && <ProjectItemCard key="project-item-card" {...data} />}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.item.findMany({
    select: {
      avl: true,
      category: true,
      code: true,
      name: true,
      quantity: true,
      ItemLog: {
        select: {
          date: true,
          quantity: true,
          status: true,
        },
      },
    },
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

  const data: ProjectItemCardProps[] = items.map((item) => ({
    itemName: item.name,
    itemCode: item.code,
    avl: item.avl + '',
    qty: item.quantity + '',
    itemLogs: item.ItemLog.map((log) => ({
      date: dateStr(new Date(log.date)),
      projectNo: '1376',
      qty: log.quantity + '',
      status: STATUS[log.status] ?? '',
    })),
  }));

  return {
    props: {
      categories,
      data,
    },
  };
};
