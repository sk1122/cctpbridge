import { ABI } from "@/constants/abi";
import { useContractWrite } from "wagmi";

export default function useRelease() {
  const { writeAsync } = useContractWrite({
    abi: ABI,
    functionName: "release",
    address: "0xe3edd42194D9B12781F1ed5f687328Ac764bEf02",
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
