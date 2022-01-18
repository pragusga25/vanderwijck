import React from 'react';
export interface ProjectStatusData {
  date?: string;
  projectNo: string;
  transactionNumber: string;
  itemName: string;
  subcode: string;
  qty: string;
  unit: string;
  requestedBy?: string;
  approvedBy: string;
  status: string;
  rejectedReason?: string;
}
const StatusTable: React.FC<{ data: ProjectStatusData[] }> = ({ data }) => {
  return (
    <div
      style={{ minWidth: '900px' }}
      className="w-full px-1 overflow-x-auto text-center"
    >
      <table>
        <thead className="text-sm">
          <tr>
            <th style={{ width: '10%' }}>Waktu</th>
            <th style={{ width: '10%' }}>Project No</th>
            <th style={{ width: '10%' }}>Transaction Number</th>
            <th style={{ width: '15%' }}>Item Name</th>
            <th style={{ width: '5%' }}>Subcode</th>
            <th style={{ width: '5%' }}>Qty</th>
            <th style={{ width: '5%' }}>Unit</th>
            <th style={{ width: '10%' }}>Requested By</th>
            <th style={{ width: '10%' }}>Approved By</th>
            <th style={{ width: '10%' }}>Status</th>
            <th style={{ width: '10%' }}>Remarks/Notes</th>
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
                <td className="border-black border">{e.subcode}</td>
                <td className="border-black border">{e.qty}</td>
                <td className="border-black border">{e.unit}</td>
                <td className="border-black border">{e.requestedBy ?? ''}</td>
                <td className="border-black border">{e.approvedBy}</td>
                <td className="border-black border">{e.status}</td>
                <td className="border-black border">
                  {e.rejectedReason ?? ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default StatusTable;
