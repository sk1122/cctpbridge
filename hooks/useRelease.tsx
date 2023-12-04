import { ABI } from "@/constants/abi";
import { BRIDGECONTRACTS } from "@/constants/address";
import { useTokenStore } from "@/store";
import { useWalletClient } from "wagmi";

export default function useRelease() {
  const { claimChainId } = useTokenStore();
  const { data: walletClient } = useWalletClient();

  async function releaseFunds(
    message: `0x${string}`,
    attestation: `0x${string}`,
    releaseChainId: number
  ) {
    console.log(
      claimChainId,
      BRIDGECONTRACTS[releaseChainId].mainnetContract,
      "TESTNET"
    );
    try {
      const hash = await walletClient!.writeContract({
        abi: ABI,
        functionName: "release",
        address: BRIDGECONTRACTS[releaseChainId].mainnetContract,
        args: [message, attestation],
      });
      return hash;
    } catch (error) {
      console.log(error);
    }
  }

  return { releaseFunds };
}
