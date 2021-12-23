import React from 'react';
export interface LogisticsMaterialCheckoutData {
  projectNo: string;
  date?: string;
  transactionNumber: string;
  itemName: string;
  status: string;
}
const LogisticsMaterialCheckout: React.FC<{
  data: LogisticsMaterialCheckoutData[];
}> = ({ data }) => {
  return (
    <div
      style={{ minWidth: '900px' }}
      className="w-full px-1 overflow-x-auto text-center"
    >
      <table className="w-full">
        <thead className="text-sm">
          <tr>
            <th className="w-1/6">Date</th>
            <th className="w-1/5">Project No</th>
            <th className="w-1/5">Transaction Number</th>
            <th className="w-1/4">Item Name</th>
            <th className="w-1/6">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr>
                <td className="border-black border">{e.date ?? ''}</td>
                <td className="border-black border">{e.projectNo}</td>
                <td className="border-black border">{e.transactionNumber}</td>
                <td className="border-black border">{e.itemName}</td>
                <td className="border-black border">{e.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default LogisticsMaterialCheckout;
