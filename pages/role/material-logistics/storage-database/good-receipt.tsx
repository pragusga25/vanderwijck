import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import Link from 'next/link';
import { BackButton } from '@components/general/button';
import LogisticsCategorySearchBar, {
  LogisticsCategoryData,
} from '@components/Logistics/LogisticsCategorySearchBar';
import LogisticsGoodReceiptTable, {
  LogisticsGoodReceiptData,
} from '@components/Logistics/Table/LogisticsGoodReceiptTable';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<LogisticsGoodReceiptData[]>(null);
  const handleSearch = (formData) => {
    console.log(formData);
    setData(DummyDatabaseData);
  };

  useEffect(() => {
    data && setCheckedIndex(Array(data.length).fill(false));
  }, [data]);
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>([]);
  
  function handleCheck(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }
  function onPost() {
      console.log("On Post:")
      console.log(data?.filter((e,i)=>checkedIndex[i]))
    // router.push('/role/material-logistics/storage-database');
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
            onClick={() =>
              router.push('/role/material-logistics/storage-database')
            }
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Good Receipt
          </h1>
        </div>
        <div className="w-full flex mt-10 gap-x-6">
          <LogisticsCategorySearchBar
            data={DummyCategoryData}
            onSearch={handleSearch}
          />
          <div
            onClick={() => !!data && onPost()}
            className="py-1.5 px-10 bg-astronaut hover:bg-blue-astronaut duration-300 ease-in-out cursor-pointer rounded text-white text-sm font-semibold"
          >
            POST
          </div>
        </div>
        <div className="h-10"></div>
        {!!data && (
          <LogisticsGoodReceiptTable
            checkedIndex={checkedIndex}
            handleCheck={handleCheck}
            data={data}
          />
        )}
      </div>
    </Layout>
  );
}

const DummyCategoryData: LogisticsCategoryData[] = [
  {
    categoryName: 'PO 001',
    choices:['001 barang 1', '001 barang 2', '001 barang 3', '001 barang 4'],
    categoryId: '1',
  },
  {
    categoryName: 'PO 002',
    choices:['002 barang 1', '002 barang 2', '002 barang 3', '002 barang 4'],
    categoryId: '2',
  },
  {
    categoryName: 'PO 003',
    choices:['003 barang 1', '003 barang 2', '003 barang 3', '003 barang 4'],
    categoryId: '3',
  },
  {
    categoryName: 'PO 004',
    choices:['004 barang 1', '004 barang 2', '004 barang 3', '004 barang 4'],
    categoryId: '4',
  },
];
const DummyDatabaseData: LogisticsGoodReceiptData[] = [
  {
    no: '1',
    itemName: 'Item 1',
    qty: '20',
    unit: '20',
    warehouse: 'Jakarta',
    projectNumber: 'XXXX',
    transCode: 'ABCD',
  },
  {
    no: '2',
    itemName: 'Item 2',
    qty: '20',
    unit: '20',
    warehouse: 'Jakarta',
    projectNumber: 'XXXX',
    transCode: 'ABCD',
  },
  {
    no: '3',
    itemName: 'Item 3',
    qty: '20',
    unit: '20',
    warehouse: 'Jakarta',
    projectNumber: 'XXXX',
    transCode: 'ABCD',
  },
  {
    no: '4',
    itemName: 'Item 4',
    qty: '20',
    unit: '20',
    warehouse: 'Jakarta',
    projectNumber: 'XXXX',
    transCode: 'ABCD',
  },
  {
    no: '5',
    itemName: 'Item 5',
    qty: '20',
    unit: '20',
    warehouse: 'Jakarta',
    projectNumber: 'XXXX',
    transCode: 'ABCD',
  },
];