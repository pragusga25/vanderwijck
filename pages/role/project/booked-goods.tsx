import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import ProjectCategorySearchBar, { ProjectCategoryData } from '@components/Project/ProjectCategorySearchBar';
import { useState } from 'react';
import Link from 'next/link';
import ProjectBookedGoodTable, {ProjectBookedGoodData} from '@components/Project/ProjectBookedGoodTable';
import { LogisticsCategoryData } from '@components/Logistics/LogisticsCategorySearchBar';
import LogisticsCategorySearchBar from '@components/Logistics/LogisticsCategorySearchBar';
export default function Page() {
  const router = useRouter();
  const dummyOnSearch = (data)=>{
    console.log(data)
    setData(DummyBookedGoodData)
  }
  function dummyOnIssue(x: ProjectBookedGoodData){
      console.log("On issue")
      console.log(x)
  }
  function dummyOnCancel(x: ProjectBookedGoodData){
    console.log("On Cancel")
    console.log(x)
}
  const [data, setData] = useState<any>(null)
  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-4/5 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-center mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Booked Goods List
          </h1>
            <Link href="/role/project/database-availability">
            <div className="ml-10 rounded bg-blue-astronaut px-6 py-2 cursor-pointer duration-300 hover:bg-blue-venice text-white font-medium">
                Database Availability
          </div>
            </Link>
        </div>
        <div className="h-16"></div>
      <LogisticsCategorySearchBar data={DummyCategoryData} onSearch={dummyOnSearch} />
      <div className="h-16"></div>
        {!!data && <ProjectBookedGoodTable data={data} onIssue={dummyOnIssue} onCancel={dummyOnCancel} />}
      <div className="h-10"></div>
      </div>
    </Layout>
  );
}

const DummyBookedGoodData: ProjectBookedGoodData[]=[
    {
        date:"22/13/2002",
        projectNo:"123",
        category:"Pipe",
        itemName:"pipa paralon 1",
        transactionCode:"12345",
        subcode:"54321",
        qty:"20",
        unit:"12"
    },
    {
        date:"22/13/2002",
        projectNo:"211",
        category:"Pipe",
        itemName:"pipa paralon 2",
        transactionCode:"12345",
        subcode:"54321",
        qty:"20",
        unit:"12"
    },
    {
        date:"22/13/2002",
        projectNo:"892",
        category:"Pipe",
        itemName:"pipa paralon 3",
        transactionCode:"12345",
        subcode:"54321",
        qty:"20",
        unit:"12"
    }
]

const DummyCategoryData: LogisticsCategoryData[] = [
  {
    categoryName: 'Categ. 1',
    choices: ['001 barang 1', '001 barang 2', '001 barang 3', '001 barang 4'],
    categoryId: '1',
  },
  {
    categoryName: 'Categ. 2',
    choices: ['002 barang 1', '002 barang 2', '002 barang 3', '002 barang 4'],
    categoryId: '2',
  },
  {
    categoryName: 'Categ. 3',
    choices: ['003 barang 1', '003 barang 2', '003 barang 3', '003 barang 4'],
    categoryId: '3',
  },
  {
    categoryName: 'Categ. 4',
    choices: ['004 barang 1', '004 barang 2', '004 barang 3', '004 barang 4'],
    categoryId: '4',
  },
];