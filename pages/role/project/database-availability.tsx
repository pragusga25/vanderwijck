import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import ProjectCategorySearchBar, { ProjectCategoryProps } from '@components/Project/ProjectCategorySearchBar';
import { useState } from 'react';
import ProjectItemCard, { ProjectItemCardProps } from '@components/Project/ProjectItemCard';

export default function Page() {
  const router = useRouter();
  const dummyOnSearch = (data)=>{
    console.log(data)
    setData(DummyItemcardData)
  }
  const [data, setData] = useState<ProjectItemCardProps>(null)
  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-4/5 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Database Availability
          </h1>
        </div>
        <div className="h-16"></div>
      <ProjectCategorySearchBar data={DummyCategoryData} onSearch={dummyOnSearch} />
      <div className="h-10"></div>
      {!!data && <ProjectItemCard {...data} />}
      </div>
    </Layout>
  );
}

const DummyItemcardData: ProjectItemCardProps = {
  itemName:"Pipe Seamless Carbon steel",
  itemCode:"XXXX-XXXX-XXXX",
  avl: "8",
  qty:"10",
  itemLogs:[
   {
     date: '19/11/2002',
     projectNo:"20",
     qty:"10",
     status:"Book"
   }
  ]
}

const DummyCategoryData: ProjectCategoryProps[]=[
  {
    categoryName:"Pipe",
    categoryId:"1"
  },
  {
    categoryName:"Reducer",
    categoryId:"2"
  },
  {
    categoryName:"Flabge",
    categoryId:"3"
  },
  {
    categoryName:"Machine",
    categoryId:"4"
  },
]