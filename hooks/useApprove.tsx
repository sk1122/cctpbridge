import { USDCABI } from "@/constants/abi/USDC";
import { useTokenStore } from "@/store";
import { parseUnits } from "viem";
import {
  useChainId,
  useContractWrite,
  usePublicClient
} from "wagmi";

export default function useApprove() {
  const { sellAmount } = useTokenStore();
  const { writeAsync } = useContractWrite({
    abi: USDCABI,
    functionName: "approve",
    address: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
  });
  const chainID = useChainId();
  const { waitForTransactionReceipt } = usePublicClient({
    chainId: chainID,
  });

  async function approveAllowance() {
    try {
      if (sellAmount.trim().length === 0) return;
      const amount = parseUnits(sellAmount, 6);
      const { hash } = await writeAsync({
        args: ["0x0e6039cd2FcE0890059ED31D5d188e0a23c241A1", amount],
      });
      await waitForTransactionReceipt({
        hash : hash,
      });
      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  return { approveAllowance };
}
