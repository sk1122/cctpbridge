import { ABI } from "@/constants/abi";
import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import { BRIDGECONTRACTS } from "@/constants/address";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import { Log, decodeEventLog, isAddress, parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useContractWrite,
  usePublicClient,
} from "wagmi";

export default function useBridge() {
  const {
    sellAmount,
    buyToken,
    sellToken,
    isReceiverAddress,
    receiverAddress,
  } = useTokenStore();
  const { address } = useAccount();
  const chainId = useChainId();
  const { waitForTransactionReceipt } = usePublicClient({
    chainId: chainId,
  });
  const { writeAsync } = useContractWrite({
    abi: ABI,
    functionName: "bridge",
    address: BRIDGECONTRACTS[sellToken].mainnetContract,
  });

  async function filterMessage(logs: Log<bigint, number, false>[]) {
    try {
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

      return message;
    } catch (error) {
      console.log(error);
    }
  }

  async function reTryCatch(
    times: number,
    logs: Log<bigint, number, false>[]
  ): Promise<any> {
    try {
      return await filterMessage(logs);
    } catch (error) {
      if (times > 0) {
        return await reTryCatch(times - 1, logs);
      } else {
        throw error;
      }
    }
  }

  const bridgeToken = async () => {
    try {
      const amount = parseUnits(sellAmount, 6);
      const destinationDomain = chains[buyToken].destinationDomain;

      console.log(destinationDomain);

      const finalAddress =
        isReceiverAddress && isAddress(receiverAddress.trim())
          ? receiverAddress
          : address!;

      const { hash } = await writeAsync({
        args: [amount, destinationDomain, finalAddress as `0x${string}`],
      });

      const { logs, transactionHash } = await waitForTransactionReceipt({
        hash: hash,
      });

      console.log(logs, transactionHash);

      const message = await reTryCatch(5, logs);

      return { message, transactionHash };
    } catch (error) {
      console.log(error);
    }
  };

  return { bridgeToken };
}
