import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import LogisticsMaterialCheckoutCard, {
  LogisticsMaterialCheckoutCardData,
} from '@components/Logistics/LogisticsMaterialCheckoutCard';
import { useEffect, useState } from 'react';
import LogisticsCheckoutSummary from '@components/Logistics/LogisticsCheckoutSummary';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Status } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';
export default function Page({
  data,
}: {
  data: LogisticsMaterialCheckoutCardData[];
}) {
  const router = useRouter();
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkAll) setCheckedIndex(Array(data.length).fill(true));
    else setCheckedIndex(Array(data.length).fill(false));
  }, [checkAll]);

  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }

  async function handleDecline(idx: number, rejectedReason?: string) {
    try {
      if (!rejectedReason) return toast.error('Please input a reason');

      await axios.post('/api/ml/materialCheckout', {
        dataPost: [
          {
            id: data[idx].id,
            quantity: Number(data[idx].qty),
            itemId: data[idx].itemId,
          },
        ],
        rejectedReason,
        isDecline: true,
      });

      toast.success('Decline Success');
      router.reload();
    } catch (err) {
      toast.error('Decline Failed');
    }
  }

  async function handleCheckout() {
    const filteredData = data.filter((e, idx) => checkedIndex[idx]);

    if (filteredData.length === 0)
      return toast.error('Silakan pilih item yang akan dicheckout');

    const dataPost = [];
    let avlExceed = false;

    filteredData.forEach((d) => {
      const avl = Number(d.avl);
      const quantity = Number(d.qty);

      if (quantity > avl) {
        avlExceed = true;
        toast.error('Jumlah yang di-checkout melebihi stok yang tersedia');
        return;
      }

      dataPost.push({ id: d.id, quantity: quantity, itemId: d.itemId });
    });

    if (avlExceed || dataPost.length === 0) return;

    try {
      setLoading(true);
      await axios.post('/api/ml/materialCheckout', {
        dataPost,
        isDecline: false,
      });

      toast.success('Checkout Success');
      router.reload();
    } catch (err) {
      toast.error('Checkout Failed');
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
            onClick={() => router.push('/role/material-logistics')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Material Checkout - Good Issue
          </h1>
        </div>

        <div
          style={{ borderBottom: '5px solid #C4C4C4' }}
          className="w-full py-6 flex justify-between items-center mt-10"
        >
          <div
            onClick={() => setCheckAll(!checkAll)}
            className="flex items-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded border-black border">
              {checkAll ? (
                <img src="/role/check.png" className="w-full h-full" alt="" />
              ) : null}
            </div>
            <h4 className="ml-2 md:ml-6 text-gray-400 text-xl lg:text-2xl">
              Check All
            </h4>
          </div>
          <Link href="/role/material-logistics/material-checkout/status">
            <div className="bg-gray-400 cursor-pointer text-white text-sm rounded py-2 px-5 md:px-8 lg:px-10">
              Checkout Status
            </div>
          </Link>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-2/3">
            {checkedIndex.map((e, idx) => (
              <LogisticsMaterialCheckoutCard
                key={`LMCCard-${idx}`}
                handleChecked={handleChecked}
                index={idx}
                isChecked={e}
                handleDecline={handleDecline}
                data={data[idx]}
              />
            ))}
          </div>
          <div
            className="w-1/4"
            style={{
              pointerEvents: loading ? 'none' : 'auto',
            }}
          >
            <LogisticsCheckoutSummary
              data={data}
              checked={checkedIndex}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const itemLogs = await prisma.itemLog.findMany({
    where: {
      status: {
        in: [Status.ISSUE_REQUEST_SENT, Status.CANCELLED],
      },
    },
    select: {
      id: true,
      transaction: {
        select: {
          approvedBy: true,
        },
      },
      item: {
        select: {
          name: true,
          avl: true,
          id: true,
        },
      },
      quantity: true,
      remark: {
        select: {
          name: true,
        },
      },
      rejectedReason: true,
    },
  });

  const data: LogisticsMaterialCheckoutCardData[] = itemLogs?.map((log) => ({
    projectNo: 'Project 1367',
    approvedBy: log.transaction.approvedBy ?? 'Iqbal Baihaqi',
    itemName: log.item.name,
    qty: log.quantity + '',
    avl: log.item.avl + '',
    remarks: log.remark.name,
    id: log.id,
    itemId: log.item.id,
    rejectedReason: log.rejectedReason ?? '',
  }));

  return {
    props: {
      data,
    },
  };
};
