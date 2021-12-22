import React from 'react';

export interface ProjectItemLogProps {
  date: string;
  projectNo: string;
  qty: string;
  status: string;
}

export interface ProjectItemCardProps {
  itemName: string;
  itemCode: string;
  qty: string;
  avl: string;
  itemLogs: ProjectItemLogProps[];
}

const ItemCard: React.FC<ProjectItemCardProps> = ({
  itemName,
  itemCode,
  itemLogs,
  qty,
  avl,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-5/12">
        <h1 className="font-bold mb-6">Description</h1>
        <div className="grid grid-cols-12">
          <h1 className="col-span-3">Item Name</h1>
          <h1 className="col-span-1">:</h1>
          <h1 className="col-span-8">{itemName}</h1>
          <h1 className="col-span-3">Item Code</h1>
          <h1 className="col-span-1">:</h1>
          <h1 className="col-span-8">{itemCode}</h1>
          <h1 className="col-span-3">Quantity</h1>
          <h1 className="col-span-1">:</h1>
          <h1 className="col-span-8">{qty}</h1>
          <h1 className="col-span-3">Available</h1>
          <h1 className="col-span-1">:</h1>
          <h1 className="col-span-8">{avl}</h1>
        </div>
      </div>
      <div className="w-full md:w-7/12 break-all">
        <h1 className="font-bold mb-6">Item Logs</h1>          
        <table className="w-full table-fixed text-center border-collapse">
            <thead>
                <tr>
                    <th className="border-black border w-1/5">Date</th>
                    <th className="border-black border w-1/5">Project Number</th>
                    <th className="border-black border w-1/6">Qty</th>
                    <th className="border-black border w-1/6">Status</th>
                </tr>
            </thead>
            <tbody>
            {itemLogs.map((e,idx) => {
            return (
              <tr key={`row-${idx}`} >
                <td className="border-black border">{e.date}</td>
                <td className="border-black border">{e.projectNo}</td>
                <td className="border-black border">{e.qty}</td>
                <td className="border-black border">{e.status}</td>
              </tr>
            );
          })}
            </tbody>
        </table>
      </div>
    </div>
  );
};
export default ItemCard;
