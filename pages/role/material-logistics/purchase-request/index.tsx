import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import LogisticsPurchaseRequest, {
  LogisticsPurchaseRequestData,
} from '@components/Logistics/Table/LogisticsPurchaseRequest';
import { useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Status } from '@prisma/client';
export default function Page({
  data,
}: {
  data: LogisticsPurchaseRequestData[];
}) {
  const router = useRouter();
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }
  function handleSend() {
    console.log('Send request');
    console.log(data.filter((e, idx) => checkedIndex[idx]));
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
          <div
            onClick={handleSend}
            className="mt-6 hover:bg-blue-venice ease-in-out duration-300 py-2 rounded cursor-pointer px-10 text-white font-medium bg-blue-astronaut"
          >
            Send Request
          </div>
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
  }));

  return {
    props: {
      data,
    },
  };
};

// const DummyData: LogisticsPurchaseRequestData[] = [
//   {
//     projectNo: '1',
//     itemCode: 'XXXX',
//     itemName: 'kucing',
//     qty: '20',
//     remarks: 'Lorem ipsum',
//   },
//   {
//     projectNo: '1',
//     itemCode: 'XXXX',
//     itemName: 'kucing',
//     qty: '20',
//     remarks: 'Lorem ipsum',
//   },
//   {
//     projectNo: '1',
//     itemCode: 'XXXX',
//     itemName: 'kucing',
//     qty: '20',
//     remarks: 'Lorem ipsum Lorem ipsum Lorem ipsum',
//   },
// ];
