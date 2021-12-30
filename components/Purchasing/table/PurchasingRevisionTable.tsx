import React, { useEffect } from 'react';
import {
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {
  LogisticsSelectPlainField,
  LogisticsNumberField,
  LogisticsDateField,
} from '@components/general/form/LogisticsSelectPlainField';
import { SelectObject } from '@components/general/form/SelectField';
import {
  PurchasingRevisionChoices,
  PurchaseItemLogRevision,
  SupplierData,
} from './PurchasingTypes';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Incoterms } from '@prisma/client';

const PurchaseListRevisionTable: React.FC<{
  choices: PurchasingRevisionChoices;
  data: PurchaseItemLogRevision[];
  handleChecked: (idx: number, check: boolean) => void;
  checkedIndex: boolean[];
}> = ({ data, handleChecked, checkedIndex, choices }) => {
  const { register, getValues, setValue } = useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const strToDate = (str: string) => {
    const spliited = str.split('-');
    return new Date(
      Number(spliited[0]),
      Number(spliited[1]) - 1,
      Number(spliited[2])
    );
  };

  async function handlePost(e) {
    e.preventDefault();
    const allResult = getValues('e');
    const checkedResult: any[] = [];
    checkedIndex.forEach((bol, idx) => {
      if (bol) checkedResult.push(allResult[idx]);
    });

    let isValid = true;

    checkedResult.forEach((d) => {
      if (!d.eta || !d.sentTo || !d.deliveryTerm || !d.supplierName)
        isValid = false;
    });

    if (!isValid) return toast.error('Please fill all fields');
    const dataPost = checkedResult.map((d) => ({
      prItemLogId: d.prItemLogId as number,
      itemLogId: d.itemLogId as number,
      date: strToDate(d.eta),
      delTerm: d.deliveryTerm as Incoterms,
      locationID: d.sentTo as string,
      quantity: Number(d.qty),
      supplierID: d.supplierName,
    }));

    setLoading(true);

    await toast
      .promise(axios.post('/api/pr/revision', { datas: dataPost }), {
        loading: 'Memproses data...',
        success: 'Berhasil memproses data',
        error: 'Gagal memproses data',
      })
      .then(() => router.reload())
      .catch(() => toast.error('Gagal memproses data'))
      .finally(() => setLoading(false));
  }
  return (
    <div
      style={{ minWidth: '1000px' }}
      className="w-full px-1 overflow-x-auto relative"
    >
      <button
        disabled={loading}
        style={{ width: 'max-content' }}
        onClick={handlePost}
        className="bg-blue-astronaut cursor-pointer text-white font-medium py-2 px-9 rounded right-0 top-0 absolute"
      >
        Post
      </button>
      <table className="w-full mt-16">
        <thead className="text-sm">
          <tr>
            <th style={{ width: '10%' }}>Date</th>
            <th style={{ width: '8%' }}>Proj. No</th>
            <th style={{ width: '9%' }}>Category</th>
            <th style={{ width: '20%' }}>Item Name</th>
            <th style={{ width: '4%' }}>Qty</th>
            <th style={{ width: '4%' }}>Unit</th>
            <th style={{ width: '8%' }}>Del. Terms</th>
            <th style={{ width: '8%' }}>ETA</th>
            <th style={{ width: '10%' }}>Sent To</th>
            <th style={{ width: '10%' }}>Supplier</th>
            <th style={{ width: '5%' }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, idx) => (
            <Row
              key={idx}
              idx={idx}
              data={e}
              handleChecked={handleChecked}
              checked={checkedIndex[idx]}
              choices={choices}
              setValue={setValue}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Row: React.FC<{
  data: PurchaseItemLogRevision;
  choices: PurchasingRevisionChoices;
  handleChecked: any;
  idx: number;
  checked: boolean;
  setValue: UseFormSetValue<FieldValues>;
}> = ({ idx, data: e, handleChecked, checked, choices, setValue }) => {
  function handleChange(fieldName: string, value: string) {
    setValue(`e.${idx}.${fieldName}`, value);
  }
  useEffect(() => {
    setValue(`e.${idx}.projectNo`, e.projectNumber);
    setValue(`e.${idx}.category`, e.category);
    setValue(`e.${idx}.itemName`, e.itemName);
    setValue(`e.${idx}.qty`, e.qty);
    setValue(`e.${idx}.unit`, e.unit);
    setValue(`e.${idx}.prItemLogId`, e.prItemLogId);
    setValue(`e.${idx}.itemLogId`, e.itemLogId);
  }, []);
  function extractChoices(data: string[]): SelectObject[] {
    return data.map((e) => {
      return {
        value: e,
        text: e,
      };
    });
  }
  return (
    <tr>
      <td className=" text-center border-black border">{e.date ?? ''}</td>
      <td className=" text-center border-black border">{e.projectNumber}</td>
      <td className="text-center border-black border">{e.category}</td>
      <td className="text-center border-black border">{e.itemName}</td>
      <td className="p-1.5 border-black border">
        <LogisticsNumberField
          onChange={handleChange}
          defaultValue={e.qty}
          fieldName="qty"
        />
      </td>
      <td className="p-1.5 border-black border">{e.unit}</td>
      <td className="p-1.5 border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={extractChoices(choices.PilihanDeliveryTerm)}
          defaultValue={''}
          fieldName="deliveryTerm"
          withSelect
        />
      </td>
      <td className="p-1.5 border-black border">
        <LogisticsDateField
          className="w-full"
          onChange={handleChange}
          fieldName="eta"
        />
      </td>
      <td className="p-1.5 border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={choices.PilihanTujuan}
          defaultValue={''}
          fieldName="sentTo"
          withSelect
        />
      </td>
      <td className="p-1.5 border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={e.supplier}
          defaultValue={''}
          fieldName="supplierName"
          withSelect
        />
      </td>
      <td className="">
        <div
          onClick={() => handleChecked(idx, !checked)}
          className="border border-black rounded w-10 mx-auto h-10"
        >
          {checked && <img src="/role/check.png" alt="" />}
        </div>
      </td>
    </tr>
  );
};
export default PurchaseListRevisionTable;
