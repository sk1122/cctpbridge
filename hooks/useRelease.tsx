import { ABI } from "@/constants/abi";
import { BRIDGECONTRACTS } from "@/constants/address";
import { useTokenStore } from "@/store";
import { useContractWrite, usePublicClient } from "wagmi";

export default function useRelease() {
  const { claimChainId } = useTokenStore();
  const { writeAsync } = useContractWrite({
    abi: ABI,
    functionName: "release",
    address: BRIDGECONTRACTS[claimChainId].testnetContract,
  });

  async function releaseFunds(
    message: `0x${string}`,
    attestation: `0x${string}`
  ) {
    try {
      const { hash } = await writeAsync({
        args: [message, attestation],
      });
      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  return { releaseFunds };
}
