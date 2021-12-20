import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
import prisma from '@lib/prisma';
import { GetServerSideProps } from 'next';

export default function Home() {
  const router = useRouter();

  return (
    <Layout
      colorType="white"
      withDropDown={false}
      message="HOME PAGE"
      isLanding
    >
      <div className="w-full">
        <img
          style={{ minHeight: '90vh' }}
          src="/landing.png"
          className="w-full hidden sm:block"
          alt=""
        />
        <img
          style={{ minHeight: '80vh' }}
          src="/landing_mobile.png"
          className="w-full sm:hidden"
          alt=""
        />
        <div className="absolute z-10 left-10 sm:left-24 top-32 sm:top-1/2 lg:left-28 w-3/4 sm:w-1/3 lg:w-1/2 text-white sm:transform sm:-translate-y-1/2">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
            Blockchain System
          </h1>
          <h3 className="my-1 sm:my-2 md:my-4 text-base sm:text-xl md:text-2xl">
            For Purchasing - Logistic at KTU
          </h3>
          <h3 className="text-base sm:text-xl md:text-2xl">
            Created by Iqbal Baihaqi
          </h3>
          <Button
            onClick={() => router.push('/role')}
            customClassName="py-1.5 px-6 sm:py-3 sm:px-9 mt-3 sm:mt-4 xl:w-60 lg:w-56 md:w-52 w-32"
            colorScheme="astronaut"
          >
            <h4>Start &gt; </h4>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const propertyNames = Object.getOwnPropertyNames(prisma);
  const modelNames = propertyNames.filter(
    (propertyName) => !propertyName.startsWith('_')
  );

  Promise.all(modelNames.map((model) => prisma[model].deleteMany()));

  return {
    props: {},
  };
};
