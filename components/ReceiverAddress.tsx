import { useTokenStore } from "@/store";
import * as Switch from "@radix-ui/react-switch";
import { Input } from "./input";
import { useState } from "react";
import { isAddress } from "viem";

export default function ReceiverAddress() {
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const {
    setReceiverAddress,
    receiverAddress,
    setIsReceiverAddress,
    isReceiverAddress,
  } = useTokenStore();
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[#7A7A7A] font-medium mx-1">
          Add Receiver’s Address
        </p>
        <Switch.Root
          className="w-[42px] h-[25px] relative rounded-full border bg-[#17181C] border-[#7A7A7A] data-[state=checked]:bg-[#431D02] data-[state=checked]:border-[#FF7D1F]"
          onClick={() => {
            setIsReceiverAddress(!isReceiverAddress);
          }}
        >
          <Switch.Thumb className="block w-[21px] h-[21px] transition-transform duration-100 bg-[#7A7A7A] translate-x-[2px] data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-[#FF7D1F] will-change-transform rounded-full" />
        </Switch.Root>
      </div>
      {isReceiverAddress ? (
        <Input
          className={`bg-[#17181C] border ${
            receiverAddress.length > 0 && !isValidAddress
              ? "border-red-500"
              : "border-[#464646]"
          } rounded-xl text-[#FF7D1F] mt-2`}
          placeholder="Receiver’s address"
          value={receiverAddress}
          onChange={(e) => {
            setReceiverAddress(e.target.value);
            if (isAddress(e.target.value)) {
              setIsValidAddress(true);
            }
          }}
        />
      ) : null}
    </div>
  );
}
