import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import { ProjectStatusData } from '@components/Project/ProjectTable';
import ProjectStatusTable from '@components/Project/ProjectTable';
import ProjectNavigation from '@components/Project/ProjectNavigation';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Status } from '@prisma/client';
import { dateToTime } from '@utils/funcs';
import { STATUS } from '@constants/index';

export default function Page({ data }: { data: ProjectStatusData[] }) {
  const router = useRouter();
  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-4/5 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Status
          </h1>
          <ProjectNavigation />
        </div>
        <h1 className="font-bold text-2xl mt-10 mb-16 xl:text-4xl">
          Material Request
        </h1>
        <ProjectStatusTable data={data} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const itemLogs = await prisma.itemLog.findMany({
    where: {
      status: {
        in: [
          Status.PURCHASE_REQUEST_SENT,
          Status.MATERIAL_REQUEST_SENT,
          Status.CREATING_PURCHASE_ORDER,
          Status.PURCHASE_ORDER_SENT,
          Status.DELIVERY,
          Status.DELIVERED,
          Status.DECLINED,
        ],
      },
    },
    select: {
      transactionId: true,
      date: true,
      quantity: true,
      unit: true,
      status: true,
      rejectedReason: true,
      item: {
        select: {
          name: true,
          subcodeValue: true,
        },
      },
      transaction: {
        select: {
          projectId: true,
          approvedBy: true,
          requestedBy: true,
        },
      },
    },
  });

  const data: ProjectStatusData[] = itemLogs.map((log) => ({
    projectNo: 1367 + '',
    transactionNumber: log.transactionId + '',
    itemName: log.item.name,
    subcode: log.item.subcodeValue,
    qty: log.quantity + '',
    unit: log.unit + '',
    approvedBy: log.transaction.approvedBy ?? 'Iqbal Baihaqi',
    requestedBy: log.transaction.requestedBy ?? 'Iqbal Baihaqi',
    status: STATUS[log.status],
    date: dateToTime(new Date(log.date)),
    rejectedReason: log.rejectedReason,
  }));

  return {
    props: {
      data,
    },
  };
};
