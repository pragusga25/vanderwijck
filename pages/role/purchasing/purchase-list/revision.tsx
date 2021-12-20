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
import PurchaseListRevisionTable from '@components/Purchasing/table/PurchasingRevisionTable';
import {
  PurchasingRevisionChoices,
  DummyPurchaseItemLogRevision,
  DummySupplierData,
  PurchaseItemLogRevision,
} from '@components/Purchasing/table/PurchasingTypes';
import SupplierSearchBar from '@components/Purchasing/PurchasingSearchBar';
export default function Page() {
  const router = useRouter();
  const supplierData = DummySupplierData
  const [data, setData] = useState<PurchaseItemLogRevision[]>(DummyPurchaseItemLogRevision);
  const [shownData, setShownData] = useState<PurchaseItemLogRevision[]>(DummyPurchaseItemLogRevision);

  const [checkedIndex, setCheckedIndex] = useState<boolean[]>(
    Array(data.length).fill(false)
  );

  function loadPurchaseRequest(supplierName: string, itemName: string) {
    setCheckedIndex(Array(data.length).fill(false));
    setShownData(data.filter(v=>v.itemName.includes(itemName) 
        && supplierData.findIndex(w=>w.supplierName == supplierName 
            && w.itemNames.includes(v.itemName)) >= 0 ))    
  }
  
  const filterBySupplier = (data) => {
    console.log(data);
    loadPurchaseRequest(data.e.categoryId || '', data.e.itemName || '')
  };
  function handleChecked(idx: number, check: boolean) {
    const res = [...checkedIndex];
    res[idx] = check;
    setCheckedIndex(res);
  }

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
            onClick={() => router.push('/role/purchasing/purchase-list')}
          />
          <h1 className="ml-4 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Purchase List
          </h1>
        </div>
        <div className="mb-4 md:mb-12">
          <SupplierSearchBar
            data={DummySupplierData}
            onSearch={filterBySupplier}
            placeholder="Supplier"
          />
        </div>
        <div className="mb-4 md:mb-12">
          <PurchaseListRevisionTable
            data={shownData}
            handleChecked={handleChecked}
            checkedIndex={checkedIndex}
            choices={DummyPRChoices}
          />
        </div>
      </div>
    </Layout>
  );
}

const DummyPRChoices: PurchasingRevisionChoices = {
  PilihanDeliveryTerm: ['Term 1', 'Term 2', 'Term 3'],
  PilihanTujuan: ['Warehouse A', 'Warehouse B', 'Warehouse C'],
};
