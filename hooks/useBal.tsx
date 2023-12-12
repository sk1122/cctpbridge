import { USDCABI } from "@/constants/abi/USDC";
import { RPC, USDCCONTRACTS } from "@/constants/address";
import { useTokenStore } from "@/store";
import { createPublicClient, formatUnits, http } from "viem";
import { useAccount } from "wagmi";

export default function useBal() {
  const { sellToken } = useTokenStore();
  const { address } = useAccount();

  async function getBalance() {
    try {
      if (!address) return;
      const rpc = createPublicClient({
        transport: http(RPC[sellToken].mainnetRPC),
      });

      const balance = await rpc.readContract({
        abi: USDCABI,
        address: USDCCONTRACTS[sellToken].mainnetContract,
        functionName: "balanceOf",
        args: [address!],
      });

      return formatUnits(balance, 6);
    } catch (error) {
      // console.log(error);
    }
  }

  return { getBalance };
}
