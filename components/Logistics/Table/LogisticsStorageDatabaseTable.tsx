import { Category } from '@prisma/client';
import React from 'react';
export interface LogisticsStorageDatabaseData {
  itemCode: string;
  itemName: string;
  qty: string;
  unit: string;
  location: string;
  category: Category;
  date?:string;
}
const LogisticsStorageDatabase: React.FC<{
  data: LogisticsStorageDatabaseData[];
}> = ({ data }) => {
  return (
    <div style={{ minWidth: '900px' }} className="w-full px-1 overflow-x-autoz">
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="w-2/12 pb-6">Item Code</th>
            <th className="w-5/12 pb-6">Item Name</th>
            <th className="w-1/12 pb-6">Qty</th>
            <th className="w-1/12 pb-6">Unit</th>
            <th className="w-3/12 pb-6">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr>
                <td className="border-black p-1 border">{e.itemCode}</td>
                <td className="border-black p-1 border">{e.itemName}</td>
                <td className="border-black p-1 border">{e.qty}</td>
                <td className="border-black p-1 border">{e.unit}</td>
                <td className="border-black p-1 border">{e.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default LogisticsStorageDatabase;
