import { ABI } from "@/constants/abi";
import { BRIDGECONTRACTS } from "@/constants/address";
import { useTokenStore } from "@/store";
import { useContractWrite, useWalletClient } from "wagmi";

export default function useRelease() {
  const { claimChainId } = useTokenStore();
  const { writeAsync } = useContractWrite({
    abi: ABI,
    functionName: "release",
    address: BRIDGECONTRACTS[claimChainId].testnetContract,
  });
  const { data: walletClient } = useWalletClient();

  async function releaseFunds(
    message: `0x${string}`,
    attestation: `0x${string}`,
    releaseChainId: number
  ) {
    console.log(
      claimChainId,
      BRIDGECONTRACTS[releaseChainId].testnetContract,
      "TESTNET"
    );
    try {
      const hash = await walletClient!.writeContract({
        abi: ABI,
        functionName: "release",
        address: BRIDGECONTRACTS[releaseChainId].testnetContract,
        args: [message, attestation],
      });
      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  return { releaseFunds };
}
