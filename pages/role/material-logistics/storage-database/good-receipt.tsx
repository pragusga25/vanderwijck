import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import LogisticsCategorySearchBar, {
  LogisticsCategoryData,
} from '@components/Logistics/LogisticsCategorySearchBar';
import LogisticsGoodReceiptTable, {
  LogisticsGoodReceiptData,
} from '@components/Logistics/Table/LogisticsGoodReceiptTable';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Category, Status } from '@prisma/client';
import uniq from 'lodash.uniq';
import axios from 'axios';
import toast from 'react-hot-toast';
import { dateToTime } from '@utils/funcs';

export default function Page({
  categories,
  databases,
}: {
  categories: LogisticsCategoryData[];
  databases: LogisticsGoodReceiptData[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LogisticsGoodReceiptData[]>(databases);
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

  useEffect(() => {
    data && setCheckedIndex(Array(data.length).fill(false));
  }, [data]);
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>([]);

  function handleCheck(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }
  async function onPost(e) {
    e.preventDefault();

    if (!data) return;
    const dataPost = data?.filter((e, i) => checkedIndex[i]);

    try {
      setLoading(true);
      await toast.promise(
        axios.post('/api/ml/database/good', {
          dataPost,
        }),
        {
          loading: 'Memproses data...',
          success: 'Item berhasil dikirim',
          error: 'Terjadi kesalahan',
        }
      );
      router.reload();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }
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
            onClick={() =>
              router.push('/role/material-logistics/storage-database')
            }
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Good Receipt
          </h1>
        </div>
        <div className="w-full flex mt-10 gap-x-6">
          <LogisticsCategorySearchBar
            data={categories}
            onSearch={handleSearch}
          />
          <button
            disabled={loading}
            onClick={(e) => onPost(e)}
            className="py-1.5 px-10 bg-astronaut hover:bg-blue-astronaut duration-300 ease-in-out cursor-pointer rounded text-white text-sm font-semibold"
          >
            POST
          </button>
        </div>
        <div className="h-10"></div>
        {!!data && (
          <LogisticsGoodReceiptTable
            checkedIndex={checkedIndex}
            handleCheck={handleCheck}
            data={data}
          />
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prs = await prisma.priItemLog.findMany({
    where: {
      status: Status.DELIVERY,
    },
    select: {
      id: true,
      date: true,
      quantity: true,
      parentItemLog: {
        select: {
          status: true,
          id: true,
          itemId: true,
          location: {
            select: {
              name: true,
            },
          },
          transactionId: true,
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
  });

  const items: { name: string; category: Category }[] = [];
  const databases: LogisticsGoodReceiptData[] = [];

  prs.forEach((it) => {
    items.push({ ...it.parentItemLog.item });
    databases.push({
      itemName: it.parentItemLog.item.name,
      qty: it.quantity + '',
      unit: it.parentItemLog.item.category === Category.PIPE ? 'meter' : 'pcs',
      warehouse: it.parentItemLog.location?.name ?? 'Warehouse Tanjung Riau',
      transCode: it.parentItemLog.transactionId + '',
      projectNumber: '1367',
      category: it.parentItemLog.item.category,
      itemId: it.parentItemLog.itemId,
      itemLogId: it.parentItemLog.id,
      prItemLogId: it.id,
      date: dateToTime(it.date),
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
