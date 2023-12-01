import { USDCABI } from "@/constants/abi/USDC";
import { RPC, USDCCONTRACTS } from "@/constants/address";
import { useTokenStore } from "@/store";
import { useEffect, useState } from "react";
import { createPublicClient, formatUnits, http } from "viem";
import { useAccount } from "wagmi";

export default function useBal() {
  const [balance, setBalance] = useState<string | null>(null);
  const { sellToken } = useTokenStore();
  const { address } = useAccount();

  async function getBalance() {
    try {
      if (!address) return;
      const rpc = createPublicClient({
        transport: http(RPC[sellToken].testnetRPC),
      });

      const balance = await rpc.readContract({
        abi: USDCABI,
        address: USDCCONTRACTS[sellToken].testnetContract,
        functionName: "balanceOf",
        args: [address],
      });

      setBalance(formatUnits(balance, 6));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBalance();
  }, [sellToken]);

  return { balance };
}
