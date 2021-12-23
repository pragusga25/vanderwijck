import React from 'react';

export interface LogisticsPurchaseRequestData {
  projectNo: string;
  itemCode: string;
  itemName: string;
  qty: string;
  remarks: string;
  itemLogId: number;
  unit: string;
  date?: string;
}

const LogisticsPurchaseRequest: React.FC<{
  data: LogisticsPurchaseRequestData[];
  checkedIndex: boolean[];
  handleChecked: (idx: number, check: boolean) => void;
}> = ({ data, checkedIndex, handleChecked }) => {
  return (
    <div
      style={{ minWidth: '900px' }}
      className="w-full px-1 overflow-x-auto text-center"
    >
      <table className="w-full">
        <thead className="">
          <tr>
            <th className="pb-4" style={{ width: '15%' }}>
              Date
            </th>
            <th className="pb-4" style={{ width: '10%' }}>
              Project No
            </th>
            <th className="pb-4" style={{ width: '8%' }}>
              Item Code
            </th>
            <th className="pb-4" style={{ width: '25%' }}>
              Item Name
            </th>
            <th className="pb-4" style={{ width: '8%' }}>
              Qty
            </th>
            <th className="pb-4" style={{ width: '20%' }}>
              Remarks
            </th>
            <th className="pb-4" style={{ width: '10%' }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, idx) => {
            return (
              <tr key={`row-${idx}`}>
                <td className="border-black border">{e.date ?? ''}</td>
                <td className="border-black border">{e.projectNo}</td>
                <td className="border-black border">{e.itemCode}</td>
                <td className="border-black border">{e.itemName}</td>
                <td className="border-black border">{e.qty}</td>
                <td className="border-black border">{e.remarks}</td>
                <td className="h-10">
                  <div
                    onClick={() => handleChecked(idx, !checkedIndex[idx])}
                    className="border-black w-9 h-8 mx-auto border rounded"
                  >
                    {checkedIndex[idx] ? (
                      <img src="/role/check.png" alt="" />
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default LogisticsPurchaseRequest;
