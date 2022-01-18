import { BackButton } from '@components/general/button';
import Layout from '@components/Layout';
import PurchaseListCard, {
  PurchaseListCardData,
} from '@components/Purchasing/PurchaseListCard';
import prisma from '@lib/prisma';
import { Status } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Page({ data }) {
  const router = useRouter();
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (checkAll) setCheckedIndex(Array(data.length).fill(true));
    else setCheckedIndex(Array(data.length).fill(false));
  }, [checkAll]);

  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }

  async function handleDecline(idx: number) {
    await post({ prItemLogId: data[idx].id as number, isDeclined: true });
  }

  async function handleAccept(idx: number) {
    await post({ prItemLogId: data[idx].id as number, isDeclined: false });
  }

  const post = async (data: { prItemLogId: number; isDeclined: boolean }) => {
    setLoading(true);
    toast
      .promise(axios.post('/api/pr/pr-list', data), {
        loading: 'Memproses data...',
        success: 'Data berhasil diproses',
        error: 'Terjadi kesalahan',
      })
      .then(() => router.reload())
      .catch(() => toast.error('Terjadi kesalahan'))
      .finally(() => setLoading(false));
  };

  function handleAcceptAll() {
    const checkedData: any[] = data.filter((e, idx) => checkedIndex[idx]);

    if (checkedData.length == 0) {
      router.push('/role/purchasing/purchase-list/revision');
    } else {
      toast
        .promise(
          axios.post('/api/pr/pr-list/all', {
            datas: checkedData.map((e) => e.id),
          }),
          {
            loading: 'Memproses data...',
            success: 'Data berhasil diproses',
            error: 'Terjadi kesalahan',
          }
        )
        .then(() => router.push('/role/purchasing/purchase-list/revision'))
        .catch(() => toast.error('Terjadi kesalahan'))
        .finally(() => setLoading(false));
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
        <div className="flex items-center mb-10 justify-between mt-6 md:mt-8 ">
          <div className="flex">
            <BackButton
              message=""
              customClassName="font-bold px-4 py-3 text-black"
              onClick={() => router.push('/role/purchasing')}
            />
            <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              Purchase List
            </h1>
          </div>
          <div className="flex">
            <div
              onClick={handleAcceptAll}
              className="py-2 mr-8 px-8 bg-blue-venice cursor-pointer rounded text-sm text-white -end"
            >
              Accept
            </div>
            <Link href="/role/purchasing/status">
              <div className="py-2 px-8 bg-blue-venice cursor-pointer rounded text-sm text-white -end">
                Status
              </div>
            </Link>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[90%]">
            {checkedIndex.map((e, idx) => (
              <PurchaseListCard
                key={`LMCCard-${idx}`}
                handleChecked={handleChecked}
                index={idx}
                isChecked={e}
                handleDecline={handleDecline}
                handleAccept={handleAccept}
                data={data[idx]}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prItemLogs = await prisma.priItemLog.findMany({
    where: {
      status: Status.PURCHASE_REQUEST_SENT,
    },
    select: {
      id: true,
      quantity: true,
      parentItemLog: {
        select: {
          transaction: true,
          remark: true,
          item: {
            select: {
              name: true,
              avl: true,
              ItemsOnSuppliers: {
                select: {
                  supplier: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const data = prItemLogs.map((log) => ({
    id: log.id,
    projectNo: 'Project 1367',
    approvedBy: log.parentItemLog.transaction.approvedBy || 'Iqbal Baihaqi',
    itemName: log.parentItemLog.item.name,
    qty: log.quantity + '',
    avl: log.parentItemLog.item.avl + '',
    remarks: log.parentItemLog.remark.name,
    suppliers: log.parentItemLog.item.ItemsOnSuppliers.map(
      (e) => e.supplier.name
    ),
  }));

  return {
    props: {
      data,
    },
  };
};
