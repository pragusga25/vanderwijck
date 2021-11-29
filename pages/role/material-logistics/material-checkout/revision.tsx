import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import LogisticsMaterialCheckoutRevision, {
  LogisticsMaterialCheckoutRevisionData,
  LogisticsMaterialCheckoutRevisionChoices,
} from '@components/Logistics/Table/LogisticsMaterialCheckoutRevisionTable';
import { useState } from 'react';
export default function Page() {
  const router = useRouter();

  const data = DummyMaterialCheckoutRevision;
  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }

  const choices: LogisticsMaterialCheckoutRevisionChoices = {
    PilihanItem: PilihanItem,
    PilihanKategori: PilihanKategori,
    PilihanKode: PilihanKode,
    PilihanProject: PilihanProject,
    PilihanSubcode: PilihanSubcode,
  };

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
              router.push('/role/material-logistics/material-checkout')
            }
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Material Checkout - Good Issue
          </h1>
        </div>
        <div className="h-10"></div>
        <LogisticsMaterialCheckoutRevision
          choices={choices}
          checkedIndex={checkedIndex}
          handleChecked={handleChecked}
          data={DummyMaterialCheckoutRevision}
        />
      </div>
    </Layout>
  );
}
const PilihanProject: string[] = [];
const PilihanKategori: string[] = [];
const PilihanKode: string[] = [];
const PilihanItem: string[] = [];
const PilihanSubcode: string[] = [];

for (let i = 1; i < 6; i++) {
  PilihanProject.push('Proj ' + i);
  PilihanKategori.push('Cat ' + i);
  PilihanKode.push('Code ' + i);
  PilihanItem.push('Item ' + i);
  PilihanSubcode.push('Scode ' + i);
}

const DummyMaterialCheckoutRevision: LogisticsMaterialCheckoutRevisionData[] = [
  {
    projectNo: 'Proj 1',
    category: 'Cat 1',
    code: 'Code 1',
    itemName: 'Item 1',
    subcode: 'Scode 1',
    qty: '20',
    unit: '30',
    remarks: 'Remarks A',
  },
  {
    projectNo: 'Proj 1',
    category: 'Cat 1',
    code: 'Code 1',
    itemName: 'Item 1',
    subcode: 'scode 1',
    qty: '20',
    unit: '30',
    remarks: 'Remarks A',
  },
  {
    projectNo: 'Proj 1',
    category: 'Cat 1',
    code: 'Code 1',
    itemName: 'Item 1',
    subcode: 'scode 1',
    qty: '20',
    unit: '30',
    remarks: 'Remarks A',
  },
  {
    projectNo: 'Proj 1',
    category: 'Cat 1',
    code: 'Code 1',
    itemName: 'Item 1',
    subcode: 'scode 1',
    qty: '20',
    unit: '30',
    remarks: 'Remarks A',
  },
  {
    projectNo: 'Proj 1',
    category: 'Cat 1',
    code: 'Code 1',
    itemName: 'Item 1',
    subcode: 'scode 1',
    qty: '20',
    unit: '30',
    remarks: 'Remarks A',
  },
];
