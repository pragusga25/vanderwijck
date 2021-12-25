import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import LogisticsPurchaseRequest, {
  LogisticsPurchaseRequestData,
} from '@components/Logistics/Table/LogisticsPurchaseRequest';
import { useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Status } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';
import { dateToTime } from '../../../../utils/funcs';

export default function Page({
  data,
}: {
  data: LogisticsPurchaseRequestData[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }
  async function handleSend() {
    const filteredData = data.filter((e, idx) => checkedIndex[idx]);

    if (filteredData.length === 0)
      return toast.error('Please select at least one item');

    const dataPost = filteredData.map((d) => ({
      itemLogId: d.itemLogId,
      quantity: Number(d.qty),
      unit: d.unit,
    }));

    setLoading(true);
    toast
      .promise(axios.post('/api/ml/purchaseRequest', { dataPost }), {
        loading: 'Sending request...',
        success: 'Request sent!',
        error: 'Error sending request',
      })
      .then(() => router.reload())
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
        <div className="flex items-center mb-10 justify-between mt-6 md:mt-8 ">
          <div className="flex">
            <BackButton
              message=""
              customClassName="font-bold px-4 py-3 text-black"
              onClick={() => router.push('/role/material-logistics')}
            />
            <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              Purchase Request
            </h1>
          </div>
          <Link href="/role/material-logistics/purchase-request/status">
            <div className="py-2 px-8 bg-gray-400 cursor-pointer rounded text-sm text-white -end">
              Checkout Status
            </div>
          </Link>
        </div>
        <LogisticsPurchaseRequest
          handleChecked={handleChecked}
          checkedIndex={checkedIndex}
          data={data}
        />
        <div className="w-full flex justify-end">
          <button
            onClick={handleSend}
            disabled={loading}
            className="mt-6 hover:bg-blue-venice ease-in-out duration-300 py-2 rounded cursor-pointer px-10 text-white font-medium bg-blue-astronaut"
          >
            Send Request
          </button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const itemLogs = await prisma.itemLog.findMany({
    where: {
      status: Status.MATERIAL_REQUEST_SENT,
    },
    select: {
      id: true,
      date: true,
      transaction: {
        select: {
          id: true,
        },
      },
      item: {
        select: {
          name: true,
          code: true,
          id: true,
        },
      },
      quantity: true,
      unit: true,
      remark: {
        select: {
          name: true,
        },
      },
    },
  });

  const data: LogisticsPurchaseRequestData[] = itemLogs?.map((log) => ({
    projectNo: '1367',
    itemName: log.item.name,
    qty: log.quantity + '',
    remarks: log.remark.name,
    itemLogId: log.id,
    itemCode: log.item.code,
    unit: log.unit,
    date: dateToTime(log.date),
  }));

  return {
    props: {
      data,
    },
  };
};
