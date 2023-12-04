import { USDCABI } from "@/constants/abi/USDC";
import { BRIDGECONTRACTS, USDCCONTRACTS } from "@/constants/address";
import { useTokenStore } from "@/store";
import { parseUnits } from "viem";
import { useChainId, useContractWrite, usePublicClient } from "wagmi";

export default function useApprove() {
  const { sellAmount, sellToken } = useTokenStore();
  const { writeAsync } = useContractWrite({
    abi: USDCABI,
    functionName: "approve",
    address: USDCCONTRACTS[sellToken].mainnetContract,
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
        args: [BRIDGECONTRACTS[sellToken].mainnetContract, amount],
      });
      await waitForTransactionReceipt({
        hash: hash,
      });
      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  return { approveAllowance };
}
