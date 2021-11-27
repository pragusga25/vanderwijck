import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';

export const RoleTemplate: React.FC<{
  title: string;
  content: string[];
  slug: string[];
  role: roleType;
}> = ({ title, content, slug, role }) => {
  const router = useRouter();
  return (
    <Layout
      colorType="white"
      withDropDown
      active={role}
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-5/6 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 mb-12 md:mb-32 xl:mb-40">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            {title}
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 xl:justify-between content-center">
          {content.map((e, i) => (
            <Card msg={e} onClick={() => router.push('/role/' + slug[i])} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

const Card: React.FC<{ msg: string; onClick: () => void }> = ({
  msg,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{ boxShadow: '1px 3px 4px 4px rgba(0, 0, 0, 0.25)' }}
      className="mb-6 w-64 h-44 md:h-56 lg:w-72 lg:h-64 xl:w-96 xl:h-80 rounded-2xl flex justify-center items-center content-center cursor-pointer"
    >
      <h1 className="px-4 md:px-6 xl:text-4xl md:text-3xl text-2xl uppercase text-center">
        {msg}
      </h1>
    </div>
  );
};

export default function Home() {
  return (
    <RoleTemplate
      role='project'
      title="Project Running"
      content={['good issue / book', 'material-request', 'status']}
      slug={[
        'project/good-issue',
        'project/material-request',
        'project/status/material-request',
      ]}
    />
  );
}
