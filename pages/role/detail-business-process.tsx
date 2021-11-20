import Head from 'next/head';
import Layout from '@components/Layout';
import Button, { BackButton } from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"

export default function Home() {
  return <RoleDetails title={Data.title} content={Data.content} isProcess />;
}

const Data = {
  title: 'Business Process',
  content:
    'Business Process for procurement activity involve three stakeholder, there are Project,  Material & Logistic, and Purchasing Division. For requesting each goods for ship maintenance or ship reparation, form used for proof of request and receipt of goods. the stages of demand for goods  in general are: submitting a list of goods, requisitions for purchasing goods, purchasing goods, receiving goods, and issue goods from the store.',
};

export const RoleDetails: React.FC<{
  title: string;
  content: string;
  isProcess?: boolean;
}> = ({ title, content, isProcess = false }) => {
  const router = useRouter();
  return (
    <Layout
      colorType="black"
      withDropDown={false}
      message={title.toUpperCase()}
      isLanding={false}
    >
      <div className="mx-auto w-5/6 pt-20 sm:pt-32 pb-16 min-h-screen">
        <div className="relative w-full mx-auto">
          <BackButton
            message="BACK"
            customClassName="font-bold px-5 py-1 sm:px-8 sm:py-2 md:px-10 md:py-3 text-black absolute left-0 top-4 "
            onClick={() => router.push('/role/help')}
          />
        </div>
        <h1 className="font-bold px-10 lg:my-8 sm:my-6 my-4 mt-20 lg:mt-8 text-center text-2xl md:text-3xl lg:text-4xl">
          Details of each role
        </h1>
        <div className="w-full flex flex-col items-start mx-auto mt-10 md:mt-16 xl:mt-20">
          <div
            style={{ borderBottom: '3px solid black' }}
            className="font-bold text-2xl md:text-4xl lg:text-5xl xl:text-6xl pb-2 mb-8 md:mb-12 lg:mb-16 xl:mb-20"
          >
            {title}
          </div>
          <div className="sm:text-lg md:text-xl lg:text-2xl text-justify">
            {content}
          </div>
        </div>
        {!!isProcess && (
          <div className="flex mt-9 md:mt-12 lg:mt-16 xl:mt-20 flex-col sm:flex-row  sm:flex-wrap items-center justify-center content-center">
            {Dummy.map((e, i) => (
              <Arrow message={e} isLast={i + 1 == Dummy.length} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

const Dummy = [
  'submitting',
  'requisitions',
  'Purchasing',
  'receiving',
  'issue',
];

const Arrow: React.FC<{ message: string; isLast?: boolean }> = ({
  message,
  isLast = false,
}) => {
  return (
    <>
      <div
        style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
        className="bg-hint-of-red py-2 md:py-3 w-28 md:w-32 text-center lg:w-36 sm:mr-3 rounded-lg capitalize mb-1 sm:mb-4"
      >
        {message}
      </div>
      {!isLast && (
        <img
          src="/role/Arrow-right.png"
          className="transform rotate-90 sm:rotate-0 w-4 sm:mr-2 mb-2 sm:mb-4 md:w-10"
          alt=""
        />
      )}
    </>
  );
};
