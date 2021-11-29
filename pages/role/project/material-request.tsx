import Head from 'next/head';
import Layout from '@components/Layout';
import Button from '@components/general/button';
import { useRouter } from 'next/router';
// import {Bg} from "@components/general/button"
import { roleType } from '@components/Layout';
import { BackButton } from '@components/general/button';
import MaterialRequestForm from '@components/general/form/MaterialRequestForm';
import { ItemProps } from '@components/general/form/GoodIssueForm';
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
        <MaterialRequestForm data={DummyItemProps} />

      </div>

    </Layout>
  );
};

const DummyItemProps: ItemProps[]=[
  {
    itemName: "Item A",
    itemId:"A",
    avl: 90,
    subcode:[{value:"sc01A", text:"Subcode01 A",}, {value:"sc02A", text:"Subcode02 A"}, {value:"sc03A", text:"Subcode03 A"}]
  },
  {
    itemName: "Item B",
    itemId:"B",
    avl: 10,
    subcode:[{value:"sc01B", text:"Subcode01 B",}, {value:"sc02B", text:"Subcode02 B"}, {value:"sc03B", text:"Subcode03 B"}]
  },
  {
    itemName: "Item C",
    itemId:"C",
    avl: 40,
    subcode:[{value:"sc01C", text:"Subcode01 C",}, {value:"sc02C", text:"Subcode02 C"}, {value:"sc03C", text:"Subcode03 C"}]
  },
  {
    itemName: "Item D",
    itemId:"D",
    avl: 24,
    subcode:[{value:"sc01D", text:"Subcode01 D",}, {value:"sc02D", text:"Subcode02 D"}, {value:"sc03D", text:"Subcode03 D"}]
  }
]
