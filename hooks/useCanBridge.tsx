import { useTokenStore } from "@/store";
import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { useAccount } from "wagmi";

export default function useCanBridge() {
  const { isConnected } = useAccount();
  const { sellAmount, isReceiverAddress, receiverAddress, balance } =
    useTokenStore();

  function validate() {
    if (isConnected && sellAmount.length > 0 && sellAmount !== "0") {
      if (balance) {
        if (balance >= sellAmount) {
          if (isReceiverAddress) {
            if (isAddress(receiverAddress)) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
    }
    return false;
  }

  return { validate };
}
