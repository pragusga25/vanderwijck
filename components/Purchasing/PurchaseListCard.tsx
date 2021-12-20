import React from 'react';
export interface PurchaseListCardData {
  projectNo: string;
  approvedBy: string;
  itemName: string;
  qty: string;
  avl: string;
  remarks: string;
  suppliers: string[];
}

export interface PurchaseListCardCardProps {
  data: PurchaseListCardData;
  index: number;
  isChecked: boolean;
  handleChecked: (idx: number, check: boolean) => void;
  handleDecline: (idx: number) => void;
  handleAccept: (idx: number) => void;
  loading: boolean;
}
const PurchaseListCard: React.FC<PurchaseListCardCardProps> = ({
  data,
  handleChecked,
  handleDecline,
  index,
  isChecked,
  handleAccept,
  loading = false,
}) => {
  return (
    <div
      style={{ borderBottom: '5px solid #C4C4C4' }}
      className="w-full px-1 py-6 gap-x-6 flex items-start"
    >
      <div
        onClick={() => handleChecked(index, !isChecked)}
        className="w-10 h-10 rounded border-black border cursor-pointer"
      >
        {isChecked ? (
          <img src="/role/check.png" className="w-full h-full" alt="" />
        ) : null}
      </div>
      <div className="w-full flex justify-between gap-x-4">
        <div className="w-full">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            {data.projectNo}
          </h2>
          <h5 className="text-sm text-gray-500 mb-9">{data.approvedBy}</h5>
          <div className="flex justify-between w-full">
            <h3>{data.itemName}</h3>
          </div>
          <h3>Qty: {data.qty}</h3>
          <div className="flex justify-between w-full">
            <h3>Remarks: {data.remarks}</h3>
            <div className="flex gap-x-4">
              <button
                disabled={loading}
                onClick={() => {
                  isChecked && handleAccept(index);
                }}
                className={`px-2.5 bg-blue-astronaut font-medium rounded text-white py-1 ${
                  !isChecked ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                Accept
              </button>
              <button
                disabled={loading}
                onClick={() => {
                  !isChecked && handleDecline(index);
                }}
                className={`px-2.5 bg-gray-400 font-medium rounded text-white py-1 ${
                  isChecked ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
        <div className="w-[30%] border-2 px-3 py-2 rounded-sm border-gray flex flex-col align-center">
          <div className="border-b-2 w-[75%] border-black pb-2 mb-2 text-center mx-auto">
            Related Suppliers
          </div>
          <ul className="flex flex-col list-disc list-inside justify-center px-2 gap-y-1">
            {data.suppliers.map((supplier) => (
              <li key={supplier}>{supplier}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PurchaseListCard;
