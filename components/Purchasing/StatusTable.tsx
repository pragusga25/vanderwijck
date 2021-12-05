import React from 'react';
export interface PurchasingStatusData {
  itemType: string;
  transactionNumber: string;
  itemName: string;
  status: string;
  poNumber: string;
}
const PurchasingStatusTable: React.FC<{ data: PurchasingStatusData[] }> = ({
  data,
}) => {
  return (
    <div
      style={{ minWidth: '900px' }}
      className="w-full px-1 overflow-x-auto text-center"
    >
      <table className="w-full">
        <thead className="text-sm">
          <tr>
            <th className="w-[10%]">Item Type</th>
            <th className="w-1/5">Transaction Number</th>
            <th className="w-[30%]">Item Name</th>
            <th className="w-1/5">Status</th>
            <th className="w-1/5">PO Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.itemType + e.transactionNumber}>
                <td className="border-black border">{e.itemType}</td>
                <td className="border-black border">{e.transactionNumber}</td>
                <td className="border-black border">{e.itemName}</td>
                <td className="border-black border">{e.status}</td>
                <td className="border-black border">{e.poNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default PurchasingStatusTable;
