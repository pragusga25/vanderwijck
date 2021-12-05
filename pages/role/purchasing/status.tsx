import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import PurchasingStatusTable, {
  PurchasingStatusData,
} from '@components/Purchasing/StatusTable';

export default function Page() {
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
        <PurchasingStatusTable data={DummyData} />
      </div>
    </Layout>
  );
}

const DummyData: PurchasingStatusData[] = [
  {
    itemType: '1',
    transactionNumber: '123',
    itemName: 'kucing',
    status: 'sukses',
    poNumber: 'po123',
  },
  {
    itemType: '1',
    transactionNumber: '123',
    itemName: 'kucing',
    status: 'sukses',
    poNumber: 'po123',
  },
  {
    itemType: '1',
    transactionNumber: '123',
    itemName: 'kucing',
    status: 'sukses',
    poNumber: 'po123',
  },
];
