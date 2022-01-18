import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import { useState } from 'react';
import Link from 'next/link';
import ProjectBookedGoodTable, {
  ProjectBookedGoodData,
} from '@components/Project/ProjectBookedGoodTable';
import { LogisticsCategoryData } from '@components/Logistics/LogisticsCategorySearchBar';
import LogisticsCategorySearchBar from '@components/Logistics/LogisticsCategorySearchBar';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Category, Status } from '@prisma/client';
import uniq from 'lodash.uniq';
import { dateStr } from '@utils/funcs';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Page({
  categories,
  data: myData,
}: {
  categories: LogisticsCategoryData[];
  data: ProjectBookedGoodData[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dummyOnSearch = (data) => {
    const itemName = data.e.itemName as string;
    setData(myData.filter((d) => d.itemName === itemName));
  };

  async function dummyOnIssue(x: ProjectBookedGoodData) {
    if (loading) return;

    setLoading(true);
    await toast
      .promise(
        axios.post('/api/project/bookedGood', {
          dataPost: { ...x, quantity: Number(x.qty), isCanceled: false },
        }),
        {
          loading: 'Memproses data...',
          success: 'Berhasil memproses data',
          error: 'Gagal memproses data',
        }
      )
      .then(() => router.reload())
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }
  async function dummyOnCancel(x: ProjectBookedGoodData) {
    if (loading) return;

    setLoading(true);
    await toast
      .promise(
        axios.post('/api/project/bookedGood', {
          dataPost: { ...x, quantity: Number(x.qty), isCanceled: true },
        }),
        {
          loading: 'Memproses data...',
          success: 'Berhasil memproses data',
          error: 'Gagal memproses data',
        }
      )
      .then(() => router.reload())
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }
  const [data, setData] = useState<any>(myData);
  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-4/5 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-center mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project/good-issue')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Booked Goods List
          </h1>
          <Link href="/role/project/database-availability">
            <div className="ml-10 rounded bg-blue-astronaut px-6 py-2 cursor-pointer duration-300 hover:bg-blue-venice text-white font-medium">
              Database Availability
            </div>
          </Link>
        </div>
        <div className="h-16"></div>
        <LogisticsCategorySearchBar
          data={categories}
          onSearch={dummyOnSearch}
        />
        <div className="h-16"></div>
        {!!data && (
          <ProjectBookedGoodTable
            data={data}
            onIssue={dummyOnIssue}
            onCancel={dummyOnCancel}
            loading={loading}
          />
        )}
        <div className="h-10"></div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const transasctions = await prisma.transaction.findMany({
    where: {
      status: Status.BOOK_REQUEST,
    },
    select: {
      id: true,
      requestedBy: true,
      ItemLog: {
        select: {
          date: true,
          id: true,
          quantity: true,
          item: {
            select: {
              category: true,
              name: true,
              subcodeValue: true,
            },
          },
        },
      },
    },
  });

  const items: { name: string; category: Category }[] = [];
  const data: ProjectBookedGoodData[] = [];
  transasctions.forEach((tr) => {
    tr.ItemLog.forEach((item) => {
      items.push({
        name: item.item.name,
        category: item.item.category,
      });

      data.push({
        requestedBy: tr.requestedBy,
        itemLogId: item.id,
        category: item.item.category,
        itemName: item.item.name,
        date: dateStr(new Date(item.date)),
        projectNo: '1367',
        qty: item.quantity + '',
        subcode: item.item.subcodeValue,
        transactionCode: tr.id,
        unit: item.item.category === Category.PIPE ? 'm' : 'pcs',
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
      data,
    },
  };
};
