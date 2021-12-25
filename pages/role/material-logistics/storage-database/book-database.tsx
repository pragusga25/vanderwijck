import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import LogisticsBookDatabase from '@components/Logistics/Table/LogisticsBookDatabaseTable';
import { Status } from '@prisma/client';
import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useState } from 'react';
import { dateToTime } from '@utils/funcs';

export default function Page({ data }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  function handleCancel(idx: number, reason: string) {
    if (!reason) {
      return toast.error('Silakan berikan alasan pembatalan');
    }
    const dataPost = {
      id: data[idx].id,
      rejectedReason: reason,
    };

    setLoading(true);

    toast
      .promise(
        axios.post('/api/ml/database/booked', {
          dataPost,
        }),
        {
          loading: 'Membatalkan permintaan ....',
          success: 'Permintaan berhasil dibatalkan',
          error: 'Terjadi kesalahan, silakan coba lagi',
        }
      )
      .then(() => router.reload())
      .catch(() => {})
      .finally(() => setLoading(false));
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
            Book Database
          </h1>
        </div>
        <div className="h-10"></div>
        <LogisticsBookDatabase
          handleCancel={handleCancel}
          data={data}
          loading={loading}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const itemLogs = await prisma.itemLog.findMany({
    where: {
      status: Status.BOOK_REQUEST,
    },
    select: {
      id: true,
      date: true,
      quantity: true,
      unit: true,
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
        },
      },
    },
  });

  const data = itemLogs.map((it) => ({
    id: it.id,
    itemCode: it.item.code,
    itemName: it.item.name,
    qty: it.quantity + '',
    unit: it.unit,
    location: it.location?.name ?? 'Tanjung Riau Warehouse',
    category: it.item.category,
    date: dateToTime(it.date),
  }));

  return {
    props: { data },
  };
};
