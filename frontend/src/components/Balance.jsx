import { memo } from "react";

export const Balance = memo(function Balance({ amount }) {
  const amountLocalString = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex ">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">₹ {amountLocalString} </div>
    </div>
  );
});
