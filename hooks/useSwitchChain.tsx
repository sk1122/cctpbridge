import React from "react";
import { useChainId, useSwitchNetwork } from "wagmi";

export default function useSwitchChain() {
  const activeChainID = useChainId();
  const { switchNetworkAsync } = useSwitchNetwork();

  async function switchChain(chainID: number) {
    try {
      if (chainID === activeChainID) {
        return activeChainID;
      } else {
        const currentChainID = await switchNetworkAsync?.(chainID);
        return currentChainID;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { switchChain };
}
