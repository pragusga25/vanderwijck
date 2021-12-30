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
  categories,
  data: myData,
}: {
  categories: LogisticsCategoryData;
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
    categoryName: 'Nam Leong',
    choices: [
      'Pipe Seamless 40A C.Steel Sch.40',
      'Pipe Seamless 80A C.Steel Sch.40',
      'Pipe Seamless 150A C.Steel Sch.40',
      'Pipe Seamless 200A C.Steel Sch.40',
      'Pipe Seamless 250A C.Steel Sch.40',
    ],
    categoryId: 'Nam Leong',
  },
  {
    categoryName: 'Asia Enterprises',
    choices: [
      'Pipe Seamless 40A C.Steel Sch.40',
      'Pipe Seamless 80A C.Steel Sch.40',
      'Pipe Seamless 150A C.Steel Sch.40',
      'Pipe Seamless 200A C.Steel Sch.40',
      'Pipe Seamless 250A C.Steel Sch.40',
    ],
    categoryId: 'Asia Enterprises',
  },
  {
    categoryName: 'PT. Mulya Acetek Perkasa',
    choices: [
      'Reducer  150A/80A C.Steel Sch.40',
      'Reducer  200A/150A C.Steel Sch.40',
      'Reducer  250A/150A C.Steel Sch.40',
      'Gasket 40A Rubber JIS 5K',
      'Gasket 80A Rubber JIS 5K',
      'Gasket 200A Rubber JIS 5K',
      'Gasket 80A Rubber JIS 10K',
      'Gasket 150A Rubber JIS 10K',
      'Gasket 200A Rubber JIS 10K',
      'Gasket 250A Rubber JIS 10K',
      'Gasket 80A Rubber JIS 16K',
      'Gasket 200A Rubber JIS 16K',
      'Flange 40A Mild Steel JIS 5K Slip On',
      'Flange 80A Mild Steel JIS 5K Slip On',
      'Flange 200A Mild Steel JIS 5K Slip On',
      'Flange 80A Mild Steel JIS 10K Slip On',
      'Flange 150A Mild Steel JIS 10K Slip On',
      'Flange 200A Mild Steel JIS 10K Slip On',
      'Flange 250A Mild Steel JIS 10K Slip On',
      'Flange 80A Mild Steel JIS 16K Slip On',
      'Flange 200A Mild Steel JIS 16K Slip On',
      'Plate Penetration 40A Mild Steel JIS 10K',
      'Plate Penetration 150A Mild Steel JIS 10K',
      'Plate Penetration 200A Mild Steel JIS 10K',
      'Plate Penetration 250A Mild Steel JIS 10K',
      'Elbow 150A C.Steel Sch.40 30 Deg.',
      'Elbow 200A C.Steel Sch.40 30 Deg.',
      'Elbow 80A C.Steel Sch.40 45 Deg.',
      'Elbow 150A C.Steel Sch.40 45 Deg.',
      'Elbow 200A C.Steel Sch.40 45 Deg.',
      'Elbow 80A C.Steel Sch.40 90 Deg.',
      'Elbow 150A C.Steel Sch.40 90 Deg.',
      'Elbow 200A C.Steel Sch.40 90 Deg.',
      'Elbow 250A C.Steel Sch.40 90 Deg.',
      'Sounding Cap 40A Bronze',
      'Vent Head 200A Mild Steel Galv. JIS 5K',
      'Butterfly Valve 150A Cast Iron JIS 10K Flange Type',
      'Butterfly Valve 250A Cast Iron JIS 10K Water Type',
      'Check Valve 150A Cast Iron JIS 10K Swing Type',
      'Check Valve 250A Cast Iron JIS 10K Swing Type',
    ],
    categoryId: 'PT. Mulya Acetek Perkasa',
  },
  {
    categoryName: 'PT. Global Benua Bajatma',
    choices: [
      'Reducer  150A/80A C.Steel Sch.40',
      'Reducer  200A/150A C.Steel Sch.40',
      'Reducer  250A/150A C.Steel Sch.40',
      'Gasket 40A Rubber JIS 5K',
      'Gasket 80A Rubber JIS 5K',
      'Gasket 200A Rubber JIS 5K',
      'Gasket 80A Rubber JIS 10K',
      'Gasket 150A Rubber JIS 10K',
      'Gasket 200A Rubber JIS 10K',
      'Gasket 250A Rubber JIS 10K',
      'Gasket 80A Rubber JIS 16K',
      'Gasket 200A Rubber JIS 16K',
      'Flange 40A Mild Steel JIS 5K Slip On',
      'Flange 80A Mild Steel JIS 5K Slip On',
      'Flange 200A Mild Steel JIS 5K Slip On',
      'Flange 80A Mild Steel JIS 10K Slip On',
      'Flange 150A Mild Steel JIS 10K Slip On',
      'Flange 200A Mild Steel JIS 10K Slip On',
      'Flange 250A Mild Steel JIS 10K Slip On',
      'Flange 80A Mild Steel JIS 16K Slip On',
      'Flange 200A Mild Steel JIS 16K Slip On',
      'Plate Penetration 40A Mild Steel JIS 10K',
      'Plate Penetration 150A Mild Steel JIS 10K',
      'Plate Penetration 200A Mild Steel JIS 10K',
      'Plate Penetration 250A Mild Steel JIS 10K',
      'Elbow 150A C.Steel Sch.40 30 Deg.',
      'Elbow 200A C.Steel Sch.40 30 Deg.',
      'Elbow 80A C.Steel Sch.40 45 Deg.',
      'Elbow 150A C.Steel Sch.40 45 Deg.',
      'Elbow 200A C.Steel Sch.40 45 Deg.',
      'Elbow 80A C.Steel Sch.40 90 Deg.',
      'Elbow 150A C.Steel Sch.40 90 Deg.',
      'Elbow 200A C.Steel Sch.40 90 Deg.',
      'Elbow 250A C.Steel Sch.40 90 Deg.',
      'Sounding Cap 40A Bronze',
      'Vent Head 200A Mild Steel Galv. JIS 5K',
      'Butterfly Valve 150A Cast Iron JIS 10K Flange Type',
      'Butterfly Valve 250A Cast Iron JIS 10K Water Type',
      'Check Valve 150A Cast Iron JIS 10K Swing Type',
      'Check Valve 250A Cast Iron JIS 10K Swing Type',
    ],
    categoryId: 'PT. Global Benua Bajatma',
  },
  {
    categoryName: 'PT. Asia Pratama',
    choices: [
      'Reducer  150A/80A C.Steel Sch.40',
      'Reducer  200A/150A C.Steel Sch.40',
      'Reducer  250A/150A C.Steel Sch.40',
      'Gasket 40A Rubber JIS 5K',
      'Gasket 80A Rubber JIS 5K',
      'Gasket 200A Rubber JIS 5K',
      'Gasket 80A Rubber JIS 10K',
      'Gasket 150A Rubber JIS 10K',
      'Gasket 200A Rubber JIS 10K',
      'Gasket 250A Rubber JIS 10K',
      'Gasket 80A Rubber JIS 16K',
      'Gasket 200A Rubber JIS 16K',
      'Flange 40A Mild Steel JIS 5K Slip On',
      'Flange 80A Mild Steel JIS 5K Slip On',
      'Flange 200A Mild Steel JIS 5K Slip On',
      'Flange 80A Mild Steel JIS 10K Slip On',
      'Flange 150A Mild Steel JIS 10K Slip On',
      'Flange 200A Mild Steel JIS 10K Slip On',
      'Flange 250A Mild Steel JIS 10K Slip On',
      'Flange 80A Mild Steel JIS 16K Slip On',
      'Flange 200A Mild Steel JIS 16K Slip On',
      'Plate Penetration 40A Mild Steel JIS 10K',
      'Plate Penetration 150A Mild Steel JIS 10K',
      'Plate Penetration 200A Mild Steel JIS 10K',
      'Plate Penetration 250A Mild Steel JIS 10K',
      'Elbow 150A C.Steel Sch.40 30 Deg.',
      'Elbow 200A C.Steel Sch.40 30 Deg.',
      'Elbow 80A C.Steel Sch.40 45 Deg.',
      'Elbow 150A C.Steel Sch.40 45 Deg.',
      'Elbow 200A C.Steel Sch.40 45 Deg.',
      'Elbow 80A C.Steel Sch.40 90 Deg.',
      'Elbow 150A C.Steel Sch.40 90 Deg.',
      'Elbow 200A C.Steel Sch.40 90 Deg.',
      'Elbow 250A C.Steel Sch.40 90 Deg.',
      'Sounding Cap 40A Bronze',
      'Vent Head 200A Mild Steel Galv. JIS 5K',
      'Butterfly Valve 150A Cast Iron JIS 10K Flange Type',
      'Butterfly Valve 250A Cast Iron JIS 10K Water Type',
      'Check Valve 150A Cast Iron JIS 10K Swing Type',
      'Check Valve 250A Cast Iron JIS 10K Swing Type',
    ],
    categoryId: 'PT. Asia Pratama',
  },
];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(
    await prisma.supplier.findMany({
      select: {
        name: true,
      },
    })
  );
  const items = await prisma.priItemLog.findMany({
    select: {
      id: true,
      parentItemLog: {
        select: {
          item: {
            select: {
              id: true,
              name: true,
              ItemsOnSuppliers: {
                select: {
                  supplier: true,
                },
              },
            },
          },
        },
      },
    },
  });

  let newArr = [];
  items.forEach((e1, i1) => {
    e1.parentItemLog.item.ItemsOnSuppliers.forEach((e2, i2) => {
      newArr.push({
        uniqid: uniqid(),
        itemType: items[i1].parentItemLog.item.id,
        itemName: items[i1].parentItemLog.item.name,
        supplier:
          items[i1].parentItemLog.item.ItemsOnSuppliers[i2].supplier.name,
        location:
          items[i1].parentItemLog.item.ItemsOnSuppliers[i2].supplier.country,
      });
    });
  });

  // [0].parentItemLog.item.ItemsOnSuppliers[0].supplier.country
  // [0].parentItemLog.item.ItemsOnSuppliers[0].supplier.name
  // [0].parentItemLog.item.name
  // [0].parentItemLog.item.id

  const data: PurchasingSupplierData[] = newArr;
  // console.log(data);

  return {
    props: {
      data,
    },
  };
};
