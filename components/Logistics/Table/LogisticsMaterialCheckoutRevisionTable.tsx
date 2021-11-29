import React from 'react';
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
export interface LogisticsMaterialCheckoutRevisionData {
  projectNo: string;
  category: string;
  code: string;
  itemName: string;
  subcode: string;
  qty: string;
  unit: string;
  remarks: string;
}
export interface LogisticsMaterialCheckoutRevisionChoices {
  PilihanProject: string[];
  PilihanKategori: string[];
  PilihanKode: string[];
  PilihanItem: string[];
  PilihanSubcode: string[];
}
const LogisticsMaterialCheckoutRevision: React.FC<{
  choices: LogisticsMaterialCheckoutRevisionChoices;
  data: LogisticsMaterialCheckoutRevisionData[];
  handleChecked: (idx: number, check: boolean) => void;
  checkedIndex: boolean[];
}> = ({ data, handleChecked, checkedIndex, choices }) => {
  const { register, getValues, setValue } = useForm();
  function handlePost() {
    console.log(getValues('e'));
  }
  return (
    <div style={{ minWidth: '1000px' }} className="w-full px-1 overflow-x-auto relative">
      <div
        style={{ width: 'max-content' }}
        onClick={handlePost}
        className="bg-blue-astronaut cursor-pointer text-white font-medium py-2 px-9 rounded right-0 top-0 absolute"
      >
        Book Database
      </div>
      <table className="w-full mt-16">
        <thead className="text-sm">
          <tr>
            <th style={{ width: '11%' }}>Proj. No</th>
            <th style={{ width: '11%' }}>Category</th>
            <th style={{ width: '12%' }}>Code</th>
            <th style={{ width: '26%' }}>Item Name</th>
            <th style={{ width: '12%' }}>Subcode</th>
            <th style={{ width: '4%' }}>Qty</th>
            <th style={{ width: '4%' }}>Unit</th>
            <th style={{ width: '15%' }}>Remarks</th>
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
}> = ({
  idx,
  data: e,
  handleChecked,
  checked,
  choices,
  setValue,
}) => {
  function handleChange(fieldName: string, value: string) {
    setValue(`e.${idx}.${fieldName}`, value);
  }
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
      <td className=" border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={extractChoices(choices.PilihanProject)}
          defaultValue={e.projectNo}
          fieldName="projectNo"
        />
      </td>
      <td className="pr-1.5 border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={extractChoices(choices.PilihanKategori)}
          defaultValue={e.category}
          fieldName="category"
        />
      </td>
      <td className="pr-1.5 border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={extractChoices(choices.PilihanKode)}
          defaultValue={e.code}
          fieldName="code"
        />
      </td>
      <td className="pr-1.5 border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={extractChoices(choices.PilihanItem)}
          defaultValue={e.itemName}
          fieldName="itemName"
        />
      </td>
      <td className="pr-1.5 border-black border">
        <LogisticsSelectPlainField
          className="w-full"
          onChange={handleChange}
          choices={extractChoices(choices.PilihanSubcode)}
          defaultValue={e.subcode}
          fieldName="subcode"
        />
      </td>
      <td className="p-1.5 border-black border">
        <LogisticsNumberField
          onChange={handleChange}
          defaultValue={e.qty}
          fieldName="qty"
        />
      </td>
      <td className="p-1.5 border-black border">
        <LogisticsNumberField
          onChange={handleChange}
          defaultValue={e.unit}
          fieldName="unit"
        />
      </td>
      <td className="p-1.5 border-black border">
      <LogisticsNumberField
          onChange={handleChange}
          defaultValue={e.remarks}
          fieldName="remarks"
          isText
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
