import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import { useEffect, useState } from 'react';
import PurchaseListCard, {
  PurchaseListCardData,
} from '@components/Purchasing/PurchaseListCard';
import Link from 'next/link';

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
    router.push('/role/material-logistics/material-checkout/revision');
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
              Purchase List
            </h1>
          </div>
          <Link href="/role/purchasing/status">
            <div className="py-2 px-8 bg-blue-venice cursor-pointer rounded text-sm text-white -end">
              Status
            </div>
          </Link>
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

const DummyMaterialCheckout: PurchaseListCardData[] = [
  {
    projectNo: 'Project 1367',
    approvedBy: 'Mr. Fulan - Engineering',
    itemName: 'Pipe Seamless- Carbon Steel sch. 40',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
    suppliers: ['google', 'shopee'],
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