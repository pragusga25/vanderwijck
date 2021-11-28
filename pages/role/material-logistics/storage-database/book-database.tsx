import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import LogisticsPurchaseRequest, {LogisticsPurchaseRequestStatusData} from '@components/Logistics/Table/LogisticsPurchaseRequestStatus';
import { LogisticsStorageDatabaseData } from '@components/Logistics/Table/LogisticsStorageDatabaseTable';
import LogisticsBookDatabase from '@components/Logistics/Table/LogisticsBookDatabaseTable';

export default function Page() {
  const router = useRouter();
  function handleCancel(idx:number, reason: string){
    console.log("Cancel this:")
    console.log(DummyDatabaseData[idx])
    console.log("Reason: "+reason)
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
            onClick={() => router.push('/role/material-logistics/storage-database')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Book Database
          </h1>
        </div>
        <div className="h-10"></div>
        <LogisticsBookDatabase handleCancel={handleCancel} data={DummyDatabaseData} />
      </div>
    </Layout>
  );
}

const DummyDatabaseData: LogisticsStorageDatabaseData[] = [
    {
      itemCode: 'XXXX',
      itemName: 'Item 1',
      qty: '20',
      unit: '20',
      location: 'Jakarta',
    },
    {
      itemCode: 'XXXX',
      itemName: 'Item 2',
      qty: '20',
      unit: '20',
      location: 'Jakarta',
    },
    {
      itemCode: 'XXXX',
      itemName: 'Item 3',
      qty: '20',
      unit: '20',
      location: 'Jakarta',
    },
    {
      itemCode: 'XXXX',
      itemName: 'Item 4',
      qty: '20',
      unit: '20',
      location: 'Jakarta',
    },
    {
      itemCode: 'XXXX',
      itemName: 'Item 5',
      qty: '20',
      unit: '20',
      location: 'Jakarta',
    },
  ];
  