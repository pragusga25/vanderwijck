import React, { useEffect, useState } from 'react';
import {
  FieldValues,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import {
  LogisticsSelectPlainField,
  LogisticsNumberField,
} from '@components/general/form/LogisticsSelectPlainField';
import { SelectObject } from '@components/general/form/SelectField';
import toast from 'react-hot-toast';
import { Remark } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface LogisticsMaterialCheckoutRevisionData {
  projectNo: string;
  category: string;
  code: string;
  itemName: string;
  subcode: string;
  qty: string;
  unit: string;
  avl: number;
  itemId: number;
  itemLogId: number;
  date?: string;
}
export interface LogisticsMaterialCheckoutRevisionChoices {
  PilihanRemarks: string[];
}

const LogisticsMaterialCheckoutRevision: React.FC<{
  choices: LogisticsMaterialCheckoutRevisionChoices;
  data: LogisticsMaterialCheckoutRevisionData[];
  handleChecked: (idx: number, check: boolean) => void;
  checkedIndex: boolean[];
  remarks: Remark[];
}> = ({ data, handleChecked, checkedIndex, choices, remarks }) => {
  const { register, getValues, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePost() {
    const allResult = getValues('e');
    const checkedResult: any[] = [];
    checkedIndex.forEach((bol, idx) => {
      if (bol) checkedResult.push(allResult[idx]);
    });

    let remarkSelectd = true;
    let itemIdAvlMap: { [key: number]: number } = {};

    checkedResult.forEach((d) => {
      if (!d.remarks || !d.qty) remarkSelectd = false;
      itemIdAvlMap = {
        ...itemIdAvlMap,
        [d.itemId]: d.avl,
      };
    });

    if (!remarkSelectd) return toast.error('Silkan lengkapi fields');

    checkedResult.forEach((d) => {
      itemIdAvlMap[d.itemId] =
        itemIdAvlMap[d.itemId] - (Number(d.qty) - Number(d.oldQty));
    });

    let isMinus = false;
    Object.keys(itemIdAvlMap).forEach((key) => {
      if (itemIdAvlMap[key] < 0) isMinus = true;
    });

    if (isMinus) return toast.error('Stok tidak cukup');

    const dataPost = checkedResult.map((d) => ({
      itemLogId: d.itemLogId,
      remarkId: remarks.find(
        (r) => r.name.toLowerCase() === d.remarks.toLowerCase()
      ).id,
      itemId: d.itemId,
      quantity: Number(d.qty),
      oldQty: Number(d.oldQty),
    }));

    try {
      setLoading(true);
      await toast.promise(
        axios.post('/api/ml/materialCheckout/revision', {
          dataPost,
        }),
        {
          loading: 'Memproses data...',
          success: 'Berhasil memproses data',
          error: 'Gagal memproses data',
        }
      );

      router.reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
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
        Book Database
      </button>
      <table className="w-full mt-16">
        <thead className="text-sm">
          <tr>
            <th style={{ width: '10%' }}>Date</th>
            <th style={{ width: '10%' }}>Proj. No</th>
            <th style={{ width: '10%' }}>Category</th>
            <th style={{ width: '9%' }}>Code</th>
            <th style={{ width: '22%' }}>Item Name</th>
            <th style={{ width: '10%' }}>Subcode</th>
            <th style={{ width: '5%' }}>Qty</th>
            <th style={{ width: '5%' }}>Unit</th>
            <th style={{ width: '14%' }}>Remarks</th>
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
  data: LogisticsMaterialCheckoutRevisionData;
  choices: LogisticsMaterialCheckoutRevisionChoices;
  handleChecked: any;
  idx: number;
  checked: boolean;
  setValue: UseFormSetValue<FieldValues>;
}> = ({ idx, data: e, handleChecked, checked, choices, setValue }) => {
  function handleChange(fieldName: string, value: string) {
    setValue(`e.${idx}.${fieldName}`, value);
  }
  useEffect(() => {
    setValue(`e.${idx}.projectNo`, e.projectNo);
    setValue(`e.${idx}.category`, e.category);
    setValue(`e.${idx}.code`, e.code);
    setValue(`e.${idx}.itemName`, e.itemName);
    setValue(`e.${idx}.subcode`, e.subcode);
    setValue(`e.${idx}.unit`, e.unit);
    setValue(`e.${idx}.avl`, e.avl);
    setValue(`e.${idx}.itemId`, e.itemId);
    setValue(`e.${idx}.itemLogId`, e.itemLogId);
    setValue(`e.${idx}.oldQty`, e.qty);
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
      <td className=" text-center border-black border">{e.projectNo}</td>
      <td className="text-center border-black border">{e.category}</td>
      <td className="text-center border-black border">{e.code}</td>
      <td className="text-center border-black border">{e.itemName}</td>
      <td className="text-center border-black border">{e.subcode}</td>
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
          choices={extractChoices(choices.PilihanRemarks)}
          defaultValue={''}
          fieldName="remarks"
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
export default LogisticsMaterialCheckoutRevision;
