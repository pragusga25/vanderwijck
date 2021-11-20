import Head from 'next/head';
import Layout from '@components/Layout';
import { BackButton } from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import Link from 'next/link';
export default function Home() {
  const router = useRouter();
  return (
    <Layout
      colorType="black"
      withDropDown={false}
      message="HELP PAGE"
      isLanding={false}
    >
      <div className=" w-full pt-20 sm:pt-32 pb-16 min-h-screen">
        <div className="relative w-5/6 mx-auto">
          <BackButton
            message="BACK"
            customClassName="font-bold px-5 py-1 sm:px-8 sm:py-2 md:px-10 md:py-3 text-black absolute left-0 top-4 "
            onClick={() => router.push('/role')}
          />
        </div>
        <h1 className="font-bold px-10 lg:my-8 sm:my-6 my-4 mt-20 lg:mt-8 text-center text-2xl md:text-3xl lg:text-4xl">
          Details of each role
        </h1>
        <div className="flex-wrap flex w-5/6 mx-auto">
          <View type={0} src="/role/bp.png" message="business process" />
          <View type={1} src="/role/pro.png" message="project" />
          <View type={2} src="/role/ml.png" message="Material & logistics" />
          <View type={3} src="/role/pur.png" message="Purchasing" />
        </div>
      </div>
    </Layout>
  );
}

const View: React.FC<{ type: number; src: string; message: string }> = ({
  src,
  message,
  type,
}) => {
  const slug =
    type == 0
      ? 'business-process'
      : type == 1
      ? 'project'
      : type == 2
      ? 'material-logistics'
      : 'purchasing';
  return (
    <Link href={`/role/detail-${slug}`}>
      <div className=" max-h-44 sm:max-h-72 md:max-h-full cursor-pointer overflow-hidden relative md:w-1/4 sm:w-1/2 w-full">
        <img
          src={src}
          className="-translate-y-1/2 md:-translate-y-0 w-full filter hover:blur-sm transform ease-in duration-500 hover:scale-150 delay-75"
          alt=""
        />
        <h4 className="pointer-events-none absolute mx-auto top-1/2 left-1/2 z-20 px-2 transform -translate-y-1/2 -translate-x-1/2 text-white font-bold uppercase text-lg text-center">
          {message}
        </h4>
      </div>
    </Link>
  );
};
