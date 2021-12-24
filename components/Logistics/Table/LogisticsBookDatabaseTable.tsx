import React, { useState } from 'react';
import { LogisticsStorageDatabaseData } from './LogisticsStorageDatabaseTable';

const LogisticsBookDatabase: React.FC<{
  data: LogisticsStorageDatabaseData[];
  handleCancel: (idx: number, reasons: string) => void;
  loading?: boolean;
}> = ({ data, handleCancel, loading }) => {
  return (
    <div
      style={{ minWidth: '1000px' }}
      className="w-full px-1 overflow-x-autoz"
    >
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="w-1/12 pb-6">Date</th>
            <th className="w-1/12 pb-6">Item Code</th>
            <th className="w-2/12 pb-6">Item Name</th>
            <th className="w-1/12 pb-6">Qty</th>
            <th className="w-1/12 pb-6">Unit</th>
            <th className="w-2/12 pb-6">Location</th>
            <th className="w-1/12 pb-6"></th>
            <th className="w-3/12 pb-6"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, idx) => (
            <Row
              key={`row-${idx}`}
              data={e}
              idx={idx}
              handleCancel={handleCancel}
              loading={loading}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Row: React.FC<{
  data: LogisticsStorageDatabaseData;
  idx: number;
  handleCancel: (idx: number, reasons: string) => void;
  loading?: boolean;
}> = ({ data: e, handleCancel, idx, loading }) => {
  const [reason, setReason] = useState<string>('');
  return (
    <tr>
      <td className="border-black p-1 border">{e.date ?? ''}</td>
      <td className="border-black p-1 border">{e.itemCode}</td>
      <td className="border-black p-1 border">{e.itemName}</td>
      <td className="border-black p-1 border">{e.qty}</td>
      <td className="border-black p-1 border">{e.unit}</td>
      <td className="border-black p-1 border">{e.location}</td>
      <td className="">
        <button
          disabled={loading}
          onClick={() => handleCancel(idx, reason)}
          className="flex py-1 rounded cursor-pointer hover:bg-gray-500 w-5/6 mx-auto justify-center items-center bg-gray-400 text-white font-medium"
        >
          Cancel
        </button>
      </td>
      <td className="border-black border">
        <input
          type="text"
          onChange={(e) => setReason(e.target.value)}
          className="outline-none p-1"
        />
      </td>
    </tr>
  );
};

export default LogisticsBookDatabase;
