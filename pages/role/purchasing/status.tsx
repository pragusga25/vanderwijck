import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import PurchasingStatusTable, {
  PurchasingStatusData,
} from '@components/Purchasing/StatusTable';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Status } from '@prisma/client';

export default function Page({data}:{data:PurchasingStatusData[]}) {
  const router = useRouter();
  return (
    <Layout
      colorType="white"
      withDropDown
      active="purchasing"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-5/6 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 mb-12 md:mb-16">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/purchasing')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            STATUS
          </h1>
        </div>
        <PurchasingStatusTable data={data} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const priItemLogs = await prisma.priItemLog.findMany({
    select: {
      parentItemLog: {
        select: {
          transaction: {
            select: {
              status: true
            }
          },
          item: {
            select: {
              name: true,
              subcodeValue: true
            }
          }
        },
      },
      quantity: true,
      id: true
    },
  });

  const data: PurchasingStatusData[] = priItemLogs.map((log) => ({
    status: log.parentItemLog.transaction.status+'',
    name: log.parentItemLog.item.name+'',
    subcode: log.parentItemLog.item.subcodeValue+'',
    qty: log.quantity,
    id: log.id
  }));

  return {
    props: {
      data,
    },
  };

// const DummyData: PurchasingStatusData[] = [
//   {
//     itemType: '1',
//     transactionNumber: '123',
//     itemName: 'kucing',
//     status: 'sukses',
//     poNumber: 'po123',
//   },
//   {
//     itemType: '1',
//     transactionNumber: '123',
//     itemName: 'kucing',
//     status: 'sukses',
//     poNumber: 'po123',
//   },
//   {
//     itemType: '1',
//     transactionNumber: '123',
//     itemName: 'kucing',
//     status: 'sukses',
//     poNumber: 'po123',
//   },
// ];
}
