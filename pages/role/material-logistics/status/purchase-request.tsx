import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import LogisticsPurchaseRequest, {LogisticsPurchaseRequestData} from '@components/Logistics/Table/LogisticsPurchaseRequest';
export default function Page() {
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
            onClick={() => router.push('/role/material-logistics')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Purchase Request
          </h1>
        </div>
        <h1 className="font-bold text-2xl mt-10 mb-16 xl:text-4xl">Status</h1>
        <LogisticsPurchaseRequest data={DummyData} />
      </div>
    </Layout>
  );
}

const DummyData: LogisticsPurchaseRequestData[] = [
  {
    projectNo: '1',
    transactionNumber: '123',
    itemName: 'kucing',
    purchaseRequestNumber:"XXX-XXXX",
    status:"Sukses"
  },
  {
    projectNo: '1',
    transactionNumber: '123',
    itemName: 'kucing',
    purchaseRequestNumber:"XXX-XXXX",
    status:"Sukses"
  },
  {
    projectNo: '1',
    transactionNumber: '123',
    itemName: 'kucing',
    purchaseRequestNumber:"XXX-XXXX",
    status:"Sukses"
  },
];
