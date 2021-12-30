import React from 'react';
export interface PurchasingStatusData {
  status: string;
  name: string;
  subcode: string;
  qty: number;
  id: any;
  date?: string;
  transCode?: string;
  supplierStatus?: string;
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
            <th className="w-1/6">Date</th>
            <th className="w-1/6">Trans. Code</th>
            <th className="w-1/6">Trans. Status</th>
            <th className="w-1/6">Item Name</th>
            <th className="w-1/12">Subcode</th>
            <th className="w-1/12">Quantity</th>
            <th className="w-1/6">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.id}>
                <td className="border-black border">{e.date ?? ''}</td>
                <td className="border-black border">{e.transCode}</td>
                <td className="border-black border">{e.status}</td>
                <td className="border-black border">{e.name}</td>
                <td className="border-black border">{e.subcode}</td>
                <td className="border-black border">{e.qty}</td>
                <td className="border-black border">{e.supplierStatus ?? ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default PurchasingStatusTable;
