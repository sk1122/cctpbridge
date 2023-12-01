import { useTokenStore } from "@/store";
import { ArrowRightLeft } from "lucide-react";
import React from "react";

export default function SwtichChainButton() {
  const { buyToken, sellToken, setSellToken, setBuyToken } = useTokenStore();

  return (
    <div className="flex justify-center -mx-2 z-10">
      <button
        className="bg-[#FF7D1F] p-1.5 rounded-full"
        onClick={() => {
          setSellToken(buyToken);
          setBuyToken(sellToken);
        }}
      >
        <ArrowRightLeft className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
