import React from 'react';
import { LogisticsMaterialCheckoutCardData } from './LogisticsMaterialCheckoutCard';
const LogisticsCheckoutSummary: React.FC<{
  data: LogisticsMaterialCheckoutCardData[];
  checked: boolean[];
  handleCheckout: ()=>void
}> = ({ data, checked, handleCheckout }) => {
  return (
    <div style={{ border: ' 1px solid #C4C4C4' }} className="py-2.5 px-7 mt-6 rounded-lg">
      <h4 className="font-medium text-lg">Checkout Summary</h4>
      {data.map((e, idx) => (
        <CSCard key={`CSCard-${idx}`} data={e} checked={checked[idx]} />
      ))}
      <div onClick={handleCheckout} className="w-full mt-5 text-white font-medium text-center uppercase py-2 rounded bg-blue-venice transform duration-300 ease-in-out hover:bg-blue-astronaut cursor-pointer">
        Checkout
      </div>
    </div>
  );
};

const CSCard: React.FC<{
  data: LogisticsMaterialCheckoutCardData;
  checked: boolean;
}> = ({ checked, data }) => {
  if (!checked) return <></>;
  return (
    <div style={{ borderBottom: '1px solid black' }} className="py-4 text-sm">
      <h4>{data.projectNo}</h4>
      <h4 className="text-gray-500 text-xs my-2">{data.itemName}</h4>
      <h4 className="text-gray-500 text-xs my-2">Qty: {data.qty}</h4>
    </div>
  );
};
export default LogisticsCheckoutSummary;