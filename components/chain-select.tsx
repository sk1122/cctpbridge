import React, { useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";

export const ChainSelect = ({ payingToken }: { payingToken: boolean }) => {
  const { sellToken, buyToken, setSellToken, setBuyToken } = useTokenStore();

  const handleValue = (id: string) => {
    payingToken ? setSellToken(id) : setBuyToken(id);
  };

  return (
    <Select.Root
      value={payingToken ? sellToken : buyToken}
      onValueChange={(id) => handleValue(id)}
    >
      <Select.Trigger
        className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-black text-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-white outline-none"
        aria-label="Food"
      >
        <Select.Value placeholder="Select a chain" />
        <Select.Icon className="text-violet11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white text-black rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group className="space-y-2">
              <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Chains
              </Select.Label>
              {chains.map((chain) => (
                <SelectItem
                  key={chain.id}
                  value={chain.id.toString()}
                  isSupported={chain.isSupported}
                >
                  <div className="w-full flex justify-center items-center space-x-2">
                    <img src={chain.logoURI} className="w-5 h-5 rounded-full" />
                    <p className="text-base">{chain.name}</p>
                    {!chain.isSupported && (
                      <p className="text-xs">(Coming soon)</p>
                    )}
                  </div>
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(
  ({ children, className, isSupported, ...props }: any, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(
          "cursor-pointer text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
        disabled={!isSupported}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
