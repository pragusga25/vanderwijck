import React from 'react';
export interface LogisticsPurchaseRequestStatusData {
  projectNo: string;
  transactionNumber: string;
  itemName: string;
  purchaseRequestNumber: string;
  status: string;
  date?: string;
}
const LogisticsPurchaseRequestStatus: React.FC<{
  data: LogisticsPurchaseRequestStatusData[];
}> = ({ data }) => {
  return (
    <div
      style={{ minWidth: '900px' }}
      className="w-full px-1 overflow-x-auto text-center"
    >
      <table className="w-full">
        <thead className="text-sm">
          <tr>
            <th className="w-2/12">Date</th>
            <th className="w-1/12">Project No</th>
            <th className="w-2/12">Transaction Number</th>
            <th className="w-3/12">Item Name</th>
            <th className="w-2/12">PR Number</th>
            <th className="w-2/12">Status</th>
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
                <td className="border-black border">
                  {e.purchaseRequestNumber}
                </td>
                <td className="border-black border">{e.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LogisticsPurchaseRequestStatus;
