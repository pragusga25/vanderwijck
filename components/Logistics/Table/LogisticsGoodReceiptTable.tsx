import { Category } from '@prisma/client';
import React from 'react';
export interface LogisticsGoodReceiptData {
  // no: string;
  itemName: string;
  qty: string;
  unit: string;
  warehouse: string;
  projectNumber: string;
  transCode: string;
  category: Category;
  itemId: number;
  prItemLogId: number;
  itemLogId: number;
  date?: string;
}

const LogisticsGoodReceiptTable: React.FC<{
  data: LogisticsGoodReceiptData[];
  handleCheck: (idx: number, check: boolean) => void;
  checkedIndex: boolean[];
}> = ({ data, checkedIndex, handleCheck }) => {
  return (
    <div style={{ minWidth: '900px' }} className="w-full px-1 overflow-x-autoz">
      <table className="w-full">
        <thead className="">
          <tr>
            <th style={{ width: '5%' }} className="pb-6">
              No
            </th>
            <th style={{ width: '10%' }} className="pb-6">
              Date
            </th>
            <th style={{ width: '23.3%' }} className="pb-6">
              Item Name
            </th>
            <th className="w-1/12 pb-6">Qty</th>
            <th className="w-1/12 pb-6">Unit</th>
            <th className="w-2/12 pb-6">Warehouse</th>
            <th style={{ width: '10%' }} className="pb-6">Project Number</th>
            <th style={{ width: '10%' }} className="pb-6">Trans. Code</th>
            <th style={{ width: '5%' }} className="pb-6"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, idx) => (
            <Row
              key={`row-${idx}`}
              e={e}
              no={idx + 1}
              checkedIndex={checkedIndex}
              handleCheck={handleCheck}
              idx={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Row: React.FC<{
  idx: number;
  handleCheck: any;
  checkedIndex: boolean[];
  e: LogisticsGoodReceiptData;
  no: number;
}> = ({ idx, handleCheck, checkedIndex, e, no }) => {
  return (
    <tr>
      <td className="border-black p-1 border text-center">{no}</td>
      <td className="border-black p-1 border">{e.date ?? ''}</td>
      <td className="border-black p-1 border">{e.itemName}</td>
      <td className="border-black p-1 border">{e.qty}</td>
      <td className="border-black p-1 border">{e.unit}</td>
      <td className="border-black p-1 border">{e.warehouse}</td>
      <td className="border-black p-1 border">{e.projectNumber}</td>
      <td className="border-black p-1 border">{e.transCode}</td>
      <td className="border-black p-1 flex justify-center items-center border">
        <div
          onClick={() => handleCheck(idx, !checkedIndex[idx])}
          className="w-8 h-8 border-black border rounded "
        >
          {checkedIndex[idx] && <img src="/role/check.png" alt="" />}
        </div>
      </td>
    </tr>
  );
};
export default LogisticsGoodReceiptTable;
