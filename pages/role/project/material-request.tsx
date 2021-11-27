import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import MaterialRequestForm from '@components/form/MaterialRequestForm';
export default  function Page() {
  const router = useRouter();
  return (
    <Layout
      colorType="white"
      withDropDown
      active="project"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-5/6 md:w-4/5 lg:w-3/4 pt-24 sm:pt-32 bg-white">
        <div className="flex items-start mt-6 md:mt-8 ">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/project')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Material Request
          </h1>
        </div>
        <MaterialRequestForm />

      </div>

    </Layout>
  );
};