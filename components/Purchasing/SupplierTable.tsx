import React from 'react';
export interface PurchasingSupplierData {
  uniqid: string;
  itemType: number;
  itemName: string;
  supplier: string;
  location: any;
}
const PurchasingSupplierTable: React.FC<{ data: PurchasingSupplierData[] }> = ({
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
            <th className="w-[30%]">Item Name</th>
            <th className="w-[30%]">Supplier</th>
            <th className="w-[30%]">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.uniqid}>
                <td className="border-black border">{e.itemType}</td>
                <td className="border-black border">{e.itemName}</td>
                <td className="border-black border">{e.supplier}</td>
                <td className="border-black border">{e.location}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default PurchasingSupplierTable;
