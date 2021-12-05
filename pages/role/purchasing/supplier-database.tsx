import Layout from '@components/Layout';
import { useRouter } from 'next/router';
import { BackButton } from '@components/general/button';
import PurchasingSupplierTable, {
  PurchasingSupplierData,
} from '@components/Purchasing/SupplierTable';
import LogisticsCategorySearchBar, {
  LogisticsCategoryData,
} from '@components/Logistics/LogisticsCategorySearchBar';
import { useState } from 'react';
import { ProjectItemCardProps } from '@components/Project/ProjectItemCard';

export default function Page() {
  const router = useRouter();
  const dummyOnSearch = (data) => {
    console.log(data);
  };
  const [data, setData] = useState<ProjectItemCardProps>(null);
  return (
    <Layout
      colorType="white"
      withDropDown
      active="purchasing"
      message="ROLE PAGE"
      isLanding={false}
    >
      <div className="mx-auto text-black w-5/6 pt-24 sm:pt-32 pb-16 min-h-screen bg-white">
        <div className="flex items-start mt-6 md:mt-8 mb-12">
          <BackButton
            message=""
            customClassName="font-bold px-4 py-3 text-black"
            onClick={() => router.push('/role/purchasing')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Supplier Database
          </h1>
        </div>
        <div className="mb-4 md:mb-12">
          <LogisticsCategorySearchBar
            data={DummyCategoryData}
            onSearch={dummyOnSearch}
            placeholder="Pipe"
          />
        </div>
        <PurchasingSupplierTable data={DummyData} />
      </div>
    </Layout>
  );
}

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

const DummyData: PurchasingSupplierData[] = [
  {
    itemType: '1',
    itemName: 'kucing',
    supplier: 'google',
    location: 'jakarta',
  },
  {
    itemType: '1',
    itemName: 'kucing',
    supplier: 'google',
    location: 'jakarta',
  },
  {
    itemType: '1',
    itemName: 'kucing',
    supplier: 'google',
    location: 'jakarta',
  },
];
