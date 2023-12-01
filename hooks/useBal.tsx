import { USDCABI } from "@/constants/abi/USDC";
import React from "react";
import {
  createPublicClient,
  formatEther,
  formatUnits,
  http,
  parseEther,
} from "viem";
import { useAccount } from "wagmi";

export default function useBal() {
  const { address } = useAccount();
  const RPC = [
    {
      id: 0,
      network: "ethereum",
      testnet: "https://rpc.ankr.com/eth_goerli",
      mainnet: "",
    },
    {
      id: 1,
      network: "polygon",
      testnet: "https://rpc.ankr.com/polygon_mumbai",
      mainnet: "https://rpc.ankr.com/polygon",
    },
    {
      id: 2,
      network: "avalanche",
      testnet: "https://rpc.ankr.com/avalanche_fuji",
      mainnet: "https://rpc.ankr.com/avalanche",
    },
    {
      id: 3,
      network: "arbitrum",
      testnet: "",
      mainnet:
        "https://arb-mainnet.g.alchemy.com/v2/y141okG6TC3PecBM1mL0BfST9f4WQmLx",
    },
    {
      id: 4,
      network: "optimism",
      testnet: "https://rpc.ankr.com/optimism_testnet",
      mainnet: "https://rpc.ankr.com/optimism",
    },
  ];

  async function getBalance(chain: number) {
    if (!address) return;
    const rpc = createPublicClient({
      transport: http(RPC[chain].testnet),
    });

    const ba = await rpc.readContract({
      abi: USDCABI,
      address: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      functionName: "balanceOf",
      args: [address],
    });

    console.log(formatUnits(ba, 6));
  }

  return { getBalance };
}
