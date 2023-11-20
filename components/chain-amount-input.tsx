import { useTokenStore } from "@/store";
import { ChainSelect } from "./chain-select";
import { Input } from "./input";

export const ChainAmountInput = ({
  text,
  payingToken,
}: {
  text: string;
  payingToken: boolean;
}) => {
  const { setSellAmount, setBuyAmount, sellAmount, buyAmount } =
    useTokenStore();

  return (
    <div className="flex px-3 py-2 bg-[#1b1b1b] rounded-xl justify-center items-center w-full h-full">
      <div className="w-full h-full flex flex-col justify-center items-start">
        <p className="text-xs px-3 text-gray-500">{text}</p>
        <Input
          type="text"
          placeholder="0"
          className="bg-transparent text-xl"
          disabled={!payingToken}
          onChange={(e) => {
            payingToken
              ? setSellAmount(e.target.value)
              : setBuyAmount(e.target.value);
          }}
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-end space-y-1">
        <ChainSelect payingToken={payingToken} />
        <p className="text-xs text-gray-500">Balance: 0</p>
      </div>
    </div>
  );
};
