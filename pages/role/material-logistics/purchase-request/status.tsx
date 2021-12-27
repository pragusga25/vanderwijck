import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import LogisticsPurchaseRequest, {
  LogisticsPurchaseRequestStatusData,
} from '@components/Logistics/Table/LogisticsPurchaseRequestStatus';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { STATUS } from '@constants/index';
import { dateToTime } from '../../../../utils/funcs';

export default function Page({
  data,
}: {
  data: LogisticsPurchaseRequestStatusData[];
}) {
  const router = useRouter();
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
              router.push('/role/material-logistics/purchase-request')
            }
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Purchase Request
          </h1>
        </div>
        <h1 className="font-bold text-2xl mt-10 mb-16 xl:text-4xl">Status</h1>
        <LogisticsPurchaseRequest data={data} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const prItemLogs = await prisma.priItemLog.findMany({
    select: {
      id: true,
      date: true,
      purchaseRequestId: true,
      status: true,
      parentItemLog: {
        select: {
          transaction: {
            select: {
              id: true,
            },
          },
          item: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const data: LogisticsPurchaseRequestStatusData[] = prItemLogs.map((d) => ({
    projectNo: '1367',
    date: dateToTime(new Date(d.date)),
    itemName: d.parentItemLog.item.name,
    status: STATUS[d.status],
    transactionNumber: d.parentItemLog.transaction.id + '',
    purchaseRequestNumber: d.purchaseRequestId + '',
  }));

  return {
    props: {
      data,
    },
  };
};
