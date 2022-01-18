import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import { useState } from 'react';
import PurchaseListRevisionTable from '@components/Purchasing/table/PurchasingRevisionTable';
import {
  PurchaseItemLogRevision,
  PurchasingRevisionChoices,
} from '@components/Purchasing/table/PurchasingTypes';
import SupplierSearchBar from '@components/Purchasing/PurchasingSearchBar';
import { GetServerSideProps } from 'next';
import prisma from '@lib/prisma';
import { Incoterms, Status } from '@prisma/client';
import { dateToTime } from '../../../../utils/funcs';
import { SelectObject } from '@components/general/form/SelectField';

export default function Page({ myChoices, mySupplierData, myPrItemLogs }) {
  const router = useRouter();
  const supplierData = mySupplierData;
  const [data, setData] = useState<PurchaseItemLogRevision[]>(myPrItemLogs);
  const [shownData, setShownData] =
    useState<PurchaseItemLogRevision[]>(myPrItemLogs);

  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

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
        <div className="mb-4 md:mb-12"></div>
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

  const destinations: SelectObject[] = locs.map((loc) => {
    return {
      text: loc.name,
      value: String(loc.id),
    };
  });
  const myChoices: PurchasingRevisionChoices = {
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
    where: {
      parentItemLog: {
        status: Status.CREATING_PURCHASE_ORDER,
      },
    },
    select: {
      id: true,
      date: true,
      parentItemLog: {
        select: {
          quantity: true,
          unit: true,
          id: true,
          item: {
            select: {
              category: true,
              name: true,
              ItemsOnSuppliers: {
                select: {
                  supplier: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      quantity: true,
      unit: true,
    },
  });

  const myPrItemLogs: PurchaseItemLogRevision[] = prItemLogs.map((pr) => ({
    projectNumber: '1367',
    date: dateToTime(new Date(pr.date)),
    category: pr.parentItemLog.item.category,
    itemName: pr.parentItemLog.item.name,
    qty: pr.quantity + '',
    unit: pr.unit,
    prItemLogId: pr.id,
    itemLogId: pr.parentItemLog.id,
    supplier: pr.parentItemLog.item.ItemsOnSuppliers.map((e) => {
      return {
        text: e.supplier.name,
        value: String(e.supplier.id),
      };
    }),
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
