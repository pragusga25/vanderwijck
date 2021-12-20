import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import { useState } from 'react';
import PurchaseListRevisionTable from '@components/Purchasing/table/PurchasingRevisionTable';
import { PurchaseItemLogRevision } from '@components/Purchasing/table/PurchasingTypes';
import SupplierSearchBar from '@components/Purchasing/PurchasingSearchBar';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Incoterms } from '@prisma/client';

export default function Page({ myChoices, mySupplierData, myPrItemLogs }) {
  const router = useRouter();
  const supplierData = mySupplierData;
  const [data, setData] = useState<PurchaseItemLogRevision[]>(myPrItemLogs);
  const [shownData, setShownData] =
    useState<PurchaseItemLogRevision[]>(myPrItemLogs);

  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  function loadPurchaseRequest(supplierName: string, itemName: string) {
    setCheckedIndex(Array(data.length).fill(false));
    setShownData(
      data.filter(
        (v) =>
          v.itemName.includes(itemName) &&
          supplierData.findIndex(
            (w) =>
              w.supplierName == supplierName && w.itemNames.includes(v.itemName)
          ) >= 0
      )
    );
  }

  const filterBySupplier = (data) => {
    console.log(data);
    loadPurchaseRequest(data.e.categoryId || '', data.e.itemName || '');
  };
  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }

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
            onClick={() => router.push('/role/purchasing/purchase-list')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Purchase List
          </h1>
        </div>
        <div className="mb-4 md:mb-12">
          <SupplierSearchBar
            data={mySupplierData}
            onSearch={filterBySupplier}
            placeholder="Supplier"
          />
        </div>
        <div className="mb-4 md:mb-12">
          <PurchaseListRevisionTable
            data={shownData}
            handleChecked={handleChecked}
            checkedIndex={checkedIndex}
            choices={myChoices}
          />
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const incoterms = [Incoterms.CIF, Incoterms.DEP, Incoterms.FCA];
  const locs = await prisma.location.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  const destinations = locs.map((loc) => loc.name);
  const myChoices = {
    PilihanDeliveryTerm: incoterms,
    PilihanTujuan: destinations,
  };

  const supplierData = await prisma.supplier.findMany({
    select: {
      name: true,
      id: true,
      ItemsOnSuppliers: {
        select: {
          item: true,
        },
      },
    },
  });

  const mySupplierData = supplierData.map((supplier) => ({
    supplierName: supplier.name,
    itemNames: supplier.ItemsOnSuppliers.map((item) => item.item.name),
  }));

  const prItemLogs = await prisma.priItemLog.findMany({
    select: {
      id: true,
      parentItemLog: {
        select: {
          quantity: true,
          unit: true,
          id: true,
          item: {
            select: {
              category: true,
              name: true,
            },
          },
        },
      },
      quantity: true,
      unit: true,
    },
  });

  const myPrItemLogs = prItemLogs.map((pr) => ({
    projectNumber: '1367',
    category: pr.parentItemLog.item.category,
    itemName: pr.parentItemLog.item.name,
    qty: pr.quantity + '',
    unit: pr.unit,
    prItemLogId: pr.id,
    itemLogId: pr.parentItemLog.id,
  }));

  return {
    props: {
      myChoices,
      mySupplierData,
      myPrItemLogs,
    },
  };
};

// const DummyPRChoices: PurchasingRevisionChoices = {
//   PilihanDeliveryTerm: ['Term 1', 'Term 2', 'Term 3'],
//   PilihanTujuan: ['Warehouse A', 'Warehouse B', 'Warehouse C'],
// };
