import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <Layout
      colorType="white"
      withDropDown={false}
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="text-white w-full pt-24 sm:pt-32 pb-16 min-h-screen bg-blue-astronaut">
        <h1 className="font-bold lg:mt-32 sm:mt-28 mt-20 text-center text-white text-4xl md:text-5xl lg:text-6xl">
          Choose Your Role
        </h1>
        <div
          id="select-role"
          className="w-4/5 mx-auto lg:my-32 sm:y-28 my-20 md:items-stretch flex-wrap flex flex-col md:flex-row justify-around items-center"
        >
          <Button
            onClick={() => router.push('/role/project')}
            customClassName="py-2 px-6 sm:py-4 md:py-5 text-center flex justify-center items-center sm:px-9 mt-3 sm:mt-4 xl:w-80 lg:w-72 md:w-60 w-72 mb-2"
            colorScheme="astronaut"
          >
            <h4 className="font-bold md:text-lg uppercase">Project</h4>
          </Button>
          <Button
            onClick={() => router.push('/role/material-logistics')}
            customClassName="py-2 px-6 sm:py-4 md:py-5 text-center flex justify-center items-center sm:px-9 mt-3 sm:mt-4 xl:w-80 lg:w-72 md:w-60 w-72 mb-2"
            colorScheme="nevada"
          >
            <h4 className="font-bold md:text-lg uppercase">
              Material & Logistics
            </h4>
          </Button>
          <Button
            onClick={() => router.push('/role/purchasing')}
            customClassName="py-2 px-6 sm:py-4 md:py-5 text-center flex justify-center items-center sm:px-9 mt-3 sm:mt-4 xl:w-80 lg:w-72 md:w-60 w-72 mb-2"
            colorScheme="blue-venice"
          >
            <h4 className="font-bold md:text-lg uppercase">Purchasing</h4>
          </Button>
        </div>
        <Button
          onClick={() => router.push('/role/help')}
          customClassName="py-2 px-6 mx-auto sm:py-3 text-center flex justify-center items-center sm:px-9 mt-3 sm:mt-4 xl:w-60 lg:w-56 md:w-52 w-32"
          colorScheme="mine-shaft"
        >
          <h4 className="font-bold uppercase">Help</h4>
        </Button>
      </div>
    </Layout>
  );
}
