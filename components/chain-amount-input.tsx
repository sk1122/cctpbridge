import { useTokenStore } from "@/store";
import { Input } from "./input";
import { useEffect, useState } from "react";
import useBal from "@/hooks/useBal";

export const ChainAmountInput = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { setSellAmount, sellAmount, setBalance, balance, sellToken } =
    useTokenStore();
  const { getBalance } = useBal();

  async function handleBalance() {
    const currentBal = await getBalance();
    if (currentBal) {
      setBalance(currentBal);
    }
  }

  useEffect(() => {
    handleBalance();
  }, [sellToken]);

  return (
    <div
      className={`px-4 py-5 bg-[#17181C] rounded-xl w-full h-full border ${
        isFocused ? "border-[#FF7D1F]" : "border-[#464646]"
      }`}
    >
      <div className="w-full h-full flex justify-between items-center">
        <p className="font-medium text-[#7A7A7A]">Enter Amount</p>
        {balance && (
          <p className="font-medium text-[#7A7A7A]">
            Available Bal: ${balance}
          </p>
        )}
      </div>
      <div className="w-full h-full flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img src="/asset/usdc.webp" alt="" className="w-5 h-5" />
          <Input
            type="number"
            step="any"
            placeholder="0"
            className="bg-transparent px-2 py-1 text-xl text-[#FF7D1F] font-semibold"
            value={sellAmount}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            onChange={(e) => {
              setSellAmount(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-[#FF7D1F] px-3 py-1 rounded-lg text-sm font-semibold"
          onClick={() => {
            if (balance) {
              setSellAmount(balance);
            }
          }}
        >
          Max
        </button>
      </div>
    </div>
  );
};
