import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

export default function FeesBox() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

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
          <p className="font-medium">$0.01</p>
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
            <p className="font-medium text-white">$0.001</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
