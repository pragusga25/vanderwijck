import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import MaterialRequestForm from '@components/general/form/MaterialRequestForm';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Item, Remark } from '@prisma/client';

export default function Page({
  items,
  remarks,
}: {
  items: Item[];
  remarks: Remark[];
}) {
  const router = useRouter();
  const data = items.map((item) => ({
    itemName: item.name,
    itemId: item.id + '',
    avl: item.avl,
  }));

  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-5/6 md:w-4/5 lg:w-3/4 pt-24 sm:pt-32 bg-white">
        <div className="flex items-start mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Material Request
          </h1>
        </div>
        <MaterialRequestForm data={data} remarks={remarks} key={JSON.stringify(data)} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const items = await prisma.item.findMany();
  const remarks = await prisma.remark.findMany();

  return {
    props: {
      items,
      remarks,
    },
  };
};
