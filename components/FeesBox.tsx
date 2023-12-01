import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useGasUsed } from "@/hooks/useGasUsed";
import { useTokenStore } from "@/store";

export default function FeesBox() {
  const { sellToken } = useTokenStore();
  const [gasFees, setGasFees] = useState<null | string>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { invoke } = useGasUsed();

  async function handleFees() {
    const data = await invoke(sellToken);
    if (data) {
      setGasFees(data.toFixed(2));
    }
    console.log(data);
  }

  useEffect(() => {
    handleFees();
  }, [sellToken]);

  return (
    <div className="bg-[#17181C] rounded-xl px-4 py-2 border border-[#464646]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#7A7A7A]">
          <p className="font-medium">Net Fees</p>
          <Info className="w-4 h-4" />
        </div>
        <div
          className="flex items-center gap-2 text-white cursor-pointer"
          onClick={() => {
            setIsOpened(!isOpened);
          }}
        >
          <p className="font-medium">${gasFees}</p>
          {isOpened ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>
      {isOpened ? (
        <>
          <div className="flex justify-between items-center mt-2">
            <p className="font-medium text-[#7A7A7A]">Bridge Fees</p>
            <div className="flex items-center gap-2 text-white">
              <p className="font-medium line-through">$0.001</p>
              <div className="bg-[#FF7D1F] rounded-full px-3 py-0.5 font-medium">
                Free
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="font-medium text-[#7A7A7A]">Gas Fees</p>
            <p className="font-medium text-white">${gasFees}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
