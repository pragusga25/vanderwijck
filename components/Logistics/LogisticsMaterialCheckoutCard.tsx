import React, { useRef } from 'react';
export interface LogisticsMaterialCheckoutCardData {
  projectNo: string;
  approvedBy: string;
  itemName: string;
  qty: string;
  avl: string;
  remarks: string;
  id: number;
  itemId: number;
  rejectedReason: string;
}

export interface LogisticsMaterialCheckoutCardProps {
  data: LogisticsMaterialCheckoutCardData;
  index: number;
  isChecked: boolean;
  handleChecked: (idx: number, check: boolean) => void;
  handleDecline: (idx: number, rejectedReason?: string) => void;
}
const LogisticsMaterialCheckoutCard: React.FC<
  LogisticsMaterialCheckoutCardProps
> = ({ data, handleChecked, handleDecline, index, isChecked }) => {
  const ref = useRef<HTMLInputElement>(null);

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
      <div className="w-full">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {data.projectNo}
        </h2>
        <h5 className="text-sm text-gray-500 mb-9">{data.approvedBy}</h5>
        <div className="flex justify-between w-full">
          <h3>{data.itemName}</h3>
          <h3>Available: {data.avl}</h3>
        </div>
        <h3>Qty: {data.qty}</h3>
        <div className="flex justify-between w-full items-center">
          <h3>Remarks: {data.remarks}</h3>
          <div className="flex items-center">
            <input
              className="border-2 border-gray-400 mr-2 p-1 rounded md:w-64"
              ref={ref}
            />
            <div
              onClick={() => {
                !isChecked && handleDecline(index, ref?.current?.value);
              }}
              className={`px-2.5 bg-gray-400 font-medium rounded text-white py-1 ${
                isChecked ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              Decline
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogisticsMaterialCheckoutCard;
