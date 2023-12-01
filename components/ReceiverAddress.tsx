import React, { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { Input } from "./input";

export default function ReceiverAddress() {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[#7A7A7A] font-medium mx-1">
          Add Receiver’s Address
        </p>
        <Switch.Root
          className="w-[42px] h-[25px] relative rounded-full border bg-[#17181C] border-[#7A7A7A] data-[state=checked]:bg-[#431D02] data-[state=checked]:border-[#FF7D1F]"
          onClick={() => {
            setIsEnabled(!isEnabled);
          }}
        >
          <Switch.Thumb className="block w-[21px] h-[21px] transition-transform duration-100 bg-[#7A7A7A] translate-x-[2px] data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-[#FF7D1F] will-change-transform rounded-full" />
        </Switch.Root>
      </div>
      {isEnabled ? (
        <Input
          className="bg-[#17181C] border border-[#464646] rounded-xl text-[#FF7D1F] mt-2"
          placeholder="Receiver’s address"
        />
      ) : null}
    </div>
  );
}
