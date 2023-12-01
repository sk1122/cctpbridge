import { ABI } from "@/constants/abi";
import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import { BRIDGECONTRACTS } from "@/constants/address";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import { decodeEventLog, parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useContractWrite,
  usePublicClient,
} from "wagmi";

export default function useBridge() {
  const { sellAmount, buyToken, sellToken } = useTokenStore();
  const { address } = useAccount();
  const chainId = useChainId();
  const { waitForTransactionReceipt } = usePublicClient({
    chainId: chainId,
  });
  const { writeAsync } = useContractWrite({
    abi: ABI,
    functionName: "bridge",
    address: BRIDGECONTRACTS[sellToken].testnetContract,
  });

  const bridgeToken = async () => {
    try {
      const amount = parseUnits(sellAmount, 6);
      const destinationDomain = chains[buyToken].destinationDomain;

      console.log(destinationDomain);

      const { hash } = await writeAsync({
        args: [amount, destinationDomain, address!],
      });

      const { logs, transactionHash } = await waitForTransactionReceipt({
        hash: hash,
      });

      console.log(logs, transactionHash);

      const log = logs.filter(
        (x) =>
          x?.topics[0]?.toLowerCase() ===
          "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036".toLowerCase()
      );

      const messagedata = decodeEventLog({
        abi: MessageTransmitterABI,
        data: log[0]?.data,
        topics: log[0]?.topics,
      });

      console.log(messagedata);

      //@ts-ignore
      const message = messagedata?.args?.message;

      return { message, transactionHash };
    } catch (error) {
      console.log(error);
    }
  };

  return { bridgeToken };
}
