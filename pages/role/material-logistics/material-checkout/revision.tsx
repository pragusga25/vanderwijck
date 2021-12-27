import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import LogisticsMaterialCheckoutRevision, {
  LogisticsMaterialCheckoutRevisionData,
  LogisticsMaterialCheckoutRevisionChoices,
} from '@components/Logistics/Table/LogisticsMaterialCheckoutRevisionTable';
import { useState } from 'react';
import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';
import { Remark, Status } from '@prisma/client';
import { dateToTime } from '@utils/funcs';

export default function Page({
  data: myData,
  remarks,
}: {
  data: LogisticsMaterialCheckoutRevisionData[];
  remarks: Remark[];
}) {
  const router = useRouter();

  const data = myData;
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;

    setCheckedIndex(res);
  }

  const choices: LogisticsMaterialCheckoutRevisionChoices = {
    PilihanRemarks: remarks.map((d) => d.name),
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
            onClick={() =>
              router.push('/role/material-logistics/material-checkout')
            }
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Material Checkout - Good Issue
          </h1>
        </div>
        <div className="h-10"></div>
        <LogisticsMaterialCheckoutRevision
          remarks={remarks}
          choices={choices}
          checkedIndex={checkedIndex}
          handleChecked={handleChecked}
          data={myData}
        />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const itemLogs = await prisma.itemLog.findMany({
    where: {
      status: Status.ISSUE_REQUEST_SENT,
    },
    select: {
      id: true,
      quantity: true,
      date: true,
      unit: true,
      item: {
        select: {
          id: true,
          name: true,
          category: true,
          code: true,
          avl: true,
          quantity: true,
          subcodeValue: true,
        },
      },
    },
  });

  const remarks = await prisma.remark.findMany();

  const data: LogisticsMaterialCheckoutRevisionData[] = itemLogs.map((it) => ({
    projectNo: '1367',
    category: it.item.category,
    code: it.item.code,
    itemName: it.item.name,
    subcode: it.item.subcodeValue,
    qty: it.quantity + '',
    unit: it.unit,
    avl: it.item.avl,
    itemId: it.item.id,
    itemLogId: it.id,
    date: dateToTime(it.date),
  }));

  return {
    props: {
      data,
      remarks,
    },
  };
};
