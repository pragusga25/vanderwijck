import React from 'react';
export interface ProjectStatusData {
  projectNo: string;
  transactionNumber: string;
  itemName: string;
  subcode: string;
  qty: string;
  unit: string;
  approvedBy: string;
  status: string;
}
const StatusTable: React.FC<{ data: ProjectStatusData[] }> = ({ data }) => {
  return (
    <div style={{ minWidth: '900px' }} className="w-full px-1 overflow-x-auto text-center">
      <table>
        <thead className="text-sm">
          <tr>
            <th className="w-1/12">Project No</th>
            <th className="w-2/12">Transaction Number</th>
            <th className="w-4/12">Item Name</th>
            <th className="w-1/12">Subcode</th>
            <th className="w-1/12">Qty</th>
            <th className="w-1/12">Unit</th>
            <th className="w-2/12">Hola By</th>
            <th className="w-1/12">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr>
                <td className="border-black border">{e.projectNo}</td>
                <td className="border-black border">{e.transactionNumber}</td>
                <td className="border-black border">{e.itemName}</td>
                <td className="border-black border">{e.subcode}</td>
                <td className="border-black border">{e.qty}</td>
                <td className="border-black border">{e.unit}</td>
                <td className="border-black border">{e.approvedBy}</td>
                <td className="border-black border">{e.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default StatusTable;