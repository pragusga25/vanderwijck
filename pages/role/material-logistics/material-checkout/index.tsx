import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import LogisticsMaterialCheckoutCard, {
  LogisticsMaterialCheckoutCardData,
} from '@components/Logistics/LogisticsMaterialCheckoutCard';
import { useEffect, useState } from 'react';
import LogisticsCheckoutSummary from '@components/Logistics/LogisticsCheckoutSummary';
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
    router.push('/role/material-logistics/material-checkout/revision')
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
          <div className="w-1/4">
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

const DummyMaterialCheckout: LogisticsMaterialCheckoutCardData[] = [
  {
    projectNo: 'Project 1367',
    approvedBy: 'Mr. Fulan - Engineering',
    itemName: 'Pipe Seamless- Carbon Steel sch. 40',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
  },
  {
    projectNo: 'Project 1111',
    approvedBy: 'Mr. Kucing Smith - Engineering',
    itemName: 'Item A',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
  },
  {
    projectNo: 'Project 2222',
    approvedBy: 'Mr. John Doe - Engineering',
    itemName: 'Item B',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
  },
  {
    projectNo: 'Project 3333',
    approvedBy: 'Mr. Ayam Bakti - Engineering',
    itemName: 'Item C',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
  },
  {
    projectNo: 'Project 4444',
    approvedBy: 'Mr. Vivo - Engineering',
    itemName: 'Item D',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
  },
  {
    projectNo: 'Project 5555',
    approvedBy: 'Mr. Panasonic - Engineering',
    itemName: 'Item E',
    qty: '8',
    avl: '8',
    remarks: 'For Ballast System Reparation',
  },
];
