import { BackButton } from '@components/general/button';
import Layout from '@components/Layout';
import PurchaseListCard, {
  PurchaseListCardData
} from '@components/Purchasing/PurchaseListCard';
import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { STATUS } from '../../../../constants';

export default function Page() {
  const router = useRouter();
  const data = DummyMaterialCheckout;
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );
  const [checkAll, setCheckAll] = useState<boolean>(false);

  useEffect(() => {
    if (checkAll) setCheckedIndex(Array(data.length).fill(true));
    else setCheckedIndex(Array(data.length).fill(false));
  }, [checkAll]);

  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }

  function handleDecline(idx: number) {
    console.log('Decline this Item');
    console.log(data[idx]);
  }

  function handleCheckout() {
    console.log('Checkout');
    console.log(data.filter((e, idx) => checkedIndex[idx]));
    router.push('/role/purchasing/purchase-list/revision');
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
          <div className='flex'>
            <div onClick={handleCheckout} className="py-2 mr-8 px-8 bg-blue-venice cursor-pointer rounded text-sm text-white -end">
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
                handleAccept={handleDecline}
                data={data[idx]}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const priItemLogs = await prisma.priItemLog.findMany({
    select: {
      parentItemLog: {
        select: {
          quantity: true,
          transaction: {
            select: {
              project: {
                select: {
                  name: true
                }
              },
              approvedBy: true
            }
            },
          item: {
            select: {
              name: true,
              avl: true,
              ItemsOnSuppliers: {
                select: {
                  supplier: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          },
          remark: {
            select: {
              name: true
            }
          }
        },
      },
    },
  });

  const data: PurchaseListCardData[] = priItemLogs.map((log) => ({
    projectNo: log.parentItemLog.quantity,
    approvedBy: log.parentItemLog.transaction.project.name,
    itemName: log.parentItemLog.transaction.approvedBy,
    qty: log.parentItemLog.item.name,
    avl: log.parentItemLog.item.avl,
    remarks: log.parentItemLog.item.ItemsOnSuppliers.supplier.name,
    suppliers: log.parentItemLog.remark.name,
  }));

  return {
    props: {
      data,
    },
  };
}


const DummyMaterialCheckout: PurchaseListCardData[] = [
  {
    projectNo: 'Project 1367',
    approvedBy: 'Mr. Fulan - Engineering',
    itemName: 'Pipe Seamless- Carbon Steel sch. 40',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
    suppliers: ['google'],
  },
  {
    projectNo: 'Project 1111',
    approvedBy: 'Mr. Kucing Smith - Engineering',
    itemName: 'Item A',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
    suppliers: ['google', 'shopee'],
  },
  {
    projectNo: 'Project 2222',
    approvedBy: 'Mr. John Doe - Engineering',
    itemName: 'Item B',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
    suppliers: ['google', 'shopee'],
  },
  {
    projectNo: 'Project 3333',
    approvedBy: 'Mr. Ayam Bakti - Engineering',
    itemName: 'Item C',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
    suppliers: ['google', 'shopee'],
  },
  {
    projectNo: 'Project 4444',
    approvedBy: 'Mr. Vivo - Engineering',
    itemName: 'Item D',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
    suppliers: ['google', 'shopee'],
  },
  {
    projectNo: 'Project 5555',
    approvedBy: 'Mr. Panasonic - Engineering',
    itemName: 'Item E',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
    suppliers: ['google', 'shopee'],
  },
];
