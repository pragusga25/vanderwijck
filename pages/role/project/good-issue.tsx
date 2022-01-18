import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import GoodIssueForm from '@components/general/form/GoodIssueForm';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Item, Remark } from '@prisma/client';
import { useState } from 'react';
export default function Page({
  items,
  remarks,
}: {
  items: Item[];
  remarks: Remark[];
}) {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const data = items.map((item) => ({
    itemName: item.name,
    itemId: item.id + '',
    avl: item.avl,
  }));

  const refreshData = () => {
    setRefresh(!refresh);
    router.replace(router.asPath);
  };

  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-5/6 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Good Issue/Book
          </h1>
          <div
            onClick={() => router.push('/role/project/booked-goods')}
            className="ml-4 flex justify-center items-center px-6 outline-none cursor-pointer font-medium transform ease-in-out duration-500 hover:bg-gray-400 text-white rounded-2xl py-1.5 sm:px-8 sm:py-2 lg:px-12 lg:py-4 bg-gray-500"
          >
            Booked Goods List
          </div>
        </div>
        <GoodIssueForm
          data={data}
          key={JSON.stringify(data) + new Date().getTime()}
          remarks={remarks}
          refreshData={refreshData}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.item.findMany();
  const remarks = await prisma.remark.findMany();

  return {
    props: {
      items,
      remarks,
    },
  };
};
