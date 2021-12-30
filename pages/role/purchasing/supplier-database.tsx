import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import PurchasingSupplierTable, {
  PurchasingSupplierData,
} from '@components/Purchasing/SupplierTable';
import LogisticsCategorySearchBar, {
  LogisticsCategoryData,
} from '@components/Logistics/LogisticsCategorySearchBar';
import { useState } from 'react';
import { ProjectItemCardProps } from '@components/Project/ProjectItemCard';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import toast from 'react-hot-toast';
import uniqid from 'uniqid';

let retrievedData: any;

export default function Page({
  searchBarData,
  data: myData,
}: {
  searchBarData: LogisticsCategoryData[];
  data: PurchasingSupplierData[];
}) {
  const [data, setData] = useState<PurchasingSupplierData[]>([]);
  const router = useRouter();
  const dummyOnSearch = (data) => {
    const supplierName = (data.e.categoryId as string) ?? '';
    const itemName = (data.e.itemName as string) ?? '';
    const item = myData.filter(
      (e) => e.supplier.includes(supplierName) && e.itemName.includes(itemName)
    );
    if (item.length > 0) {
      let arrayItem = [item].flat();
      setData(arrayItem);
    } else {
      setData([]);
      toast.error('Item tidak ditemukan recordnya');
    }
  };
  return (
    <Layout
      colorType="white"
      withDropDown
      active="purchasing"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-5/6 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 mb-12">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/purchasing')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Supplier Database
          </h1>
        </div>
        <div className="mb-4 md:mb-12">
          <LogisticsCategorySearchBar
            data={searchBarData}
            onSearch={dummyOnSearch}
          />
        </div>
        {/* <PurchasingSupplierTable data={data} /> */}
        {!!data && <PurchasingSupplierTable data={data} />}
        {/* <PurchasingSupplierTable data={retrievedData.length > 0 ? retrievedData : DummyData} /> */}
      </div>
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const arr = await prisma.itemsOnSuppliers.findMany({
    select: {
      item: {
        select: {
          name: true,
          id: true,
        },
      },
      supplier: {
        select: {
          name: true,
          country: true,
        },
      },
    },
  });

  let searchBarData: LogisticsCategoryData[] = [];

  let key: string[] = [];
  let val: string[][] = [];

  let newArr: PurchasingSupplierData[] = arr.map((e) => {
    let i = key.indexOf(e.supplier.name);
    if (i < 0) {
      i = key.length;
      key[i] = e.supplier.name;
      val[i] = []
    }
    val[i].push(e.item.name);
    return {
      uniqid: uniqid(),
      itemType: e.item.id,
      itemName: e.item.name,
      supplier: e.supplier.name,
      location: e.supplier.country,
    };
  });

  const data: PurchasingSupplierData[] = newArr;
  searchBarData = key.map((e, idx) => {
    return {
      categoryName: e,
      categoryId: e,
      choices: val[idx],
    };
  });

  return {
    props: {
      data,
      searchBarData
    },
  };
};
