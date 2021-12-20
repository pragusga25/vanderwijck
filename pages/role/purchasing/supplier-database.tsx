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

let retrievedData: any;

export default function Page({
  categories,
  data: myData
}: {
  categories: LogisticsCategoryData,
  data: any
}) {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const dummyOnSearch = (data) => {
    // Somehow the `data` here is just 1 object, even tho I don't use [0] anymore when processing data:
  //   {
  //     "e": {
  //         "categoryId": "1",
  //         "itemName": "Pipe Seamless 40A C.Steel Sch.40"
  //     }
  // }
    const name = data.e.itemName as string;
    const item = myData.find((d) => d.itemName === name);
    if (item) {
      let arrayItem = [item].flat()
      setData(arrayItem);
    } else {
      setData(false)
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
            data={DummyCategoryData}
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

const DummyCategoryData: LogisticsCategoryData[] = [
  {
    'categoryName': 'PIPE',
    'choices': ['Pipe Seamless 40A C.Steel Sch.40','Pipe Seamless 80A C.Steel Sch.40','Pipe Seamless 150A C.Steel Sch.40','Pipe Seamless 200A C.Steel Sch.40','Pipe Seamless 250A C.Steel Sch.40'],
    'categoryId': '1'
    },
    {
    'categoryName': 'FITTING',
    'choices': ['Reducer  150A/80A C.Steel Sch.40','Reducer  200A/150A C.Steel Sch.40','Reducer  250A/150A C.Steel Sch.40','Gasket 40A Rubber JIS 5K','Gasket 80A Rubber JIS 5K','Gasket 200A Rubber JIS 5K','Gasket 80A Rubber JIS 10K','Gasket 150A Rubber JIS 10K','Gasket 200A Rubber JIS 10K','Gasket 250A Rubber JIS 10K','Gasket 80A Rubber JIS 16K','Gasket 200A Rubber JIS 16K','Flange 40A Mild Steel JIS 5K Slip On','Flange 80A Mild Steel JIS 5K Slip On','Flange 200A Mild Steel JIS 5K Slip On','Flange 80A Mild Steel JIS 10K Slip On','Flange 150A Mild Steel JIS 10K Slip On','Flange 200A Mild Steel JIS 10K Slip On','Flange 250A Mild Steel JIS 10K Slip On','Flange 80A Mild Steel JIS 16K Slip On','Flange 200A Mild Steel JIS 16K Slip On','Plate Penetration 40A Mild Steel JIS 10K','Plate Penetration 150A Mild Steel JIS 10K','Plate Penetration 200A Mild Steel JIS 10K','Plate Penetration 250A Mild Steel JIS 10K','Elbow 150A C.Steel Sch.40 30 Deg.','Elbow 200A C.Steel Sch.40 30 Deg.','Elbow 80A C.Steel Sch.40 45 Deg.','Elbow 150A C.Steel Sch.40 45 Deg.','Elbow 200A C.Steel Sch.40 45 Deg.','Elbow 80A C.Steel Sch.40 90 Deg.','Elbow 150A C.Steel Sch.40 90 Deg.','Elbow 200A C.Steel Sch.40 90 Deg.','Elbow 250A C.Steel Sch.40 90 Deg.','Sounding Cap 40A Bronze','Vent Head 200A Mild Steel Galv. JIS 5K'],
    'categoryId': '2'
    },
    {
    'categoryName': 'VALVES',
    'choices': ['Butterfly Valve 150A Cast Iron JIS 10K Flange Type','Butterfly Valve 250A Cast Iron JIS 10K Water Type','Check Valve 150A Cast Iron JIS 10K Swing Type','Check Valve 250A Cast Iron JIS 10K Swing Type'],
    'categoryId': '3'
    }
];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const items = await prisma.itemsOnSuppliers.findMany({
    select: {
      supplier: {
        select: {
          name: true,
          country: true
        }
      },
      item: {
        select: {
          id: true,
          name: true
        }
      }
    },
  });

  const data: PurchasingSupplierData[] = items.map((log) => ({
    itemType: log.item.id,
    itemName: log.item.name+'',
    supplier: log.supplier.name+'',
    location: log.supplier.country+''
  }));

  return {
    props: {
      data,
    },
  };
}

const DummyData: PurchasingSupplierData[] = [
  {
    itemType: 1,
    itemName: 'kucing',
    supplier: 'google',
    location: 'jakarta',
  },
  {
    itemType: 2,
    itemName: 'kucing',
    supplier: 'google',
    location: 'jakarta',
  },
  {
    itemType: 3,
    itemName: 'kucing',
    supplier: 'google',
    location: 'jakarta',
  },
];