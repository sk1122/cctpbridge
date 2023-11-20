import { ABI } from "@/constants/abi";
import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import { chains } from "@/lib/data";
import { publicClientViem } from "@/pages/_app";
import { useTokenStore } from "@/store";
import { decodeEventLog, parseUnits } from "viem";
import { useAccount, useContractWrite } from "wagmi";

export default function useBridge() {
  const { sellAmount, sellToken } = useTokenStore();
  const { address } = useAccount();
  const { writeAsync } = useContractWrite({
    abi: ABI,
    functionName: "bridge",
    address: "0x0e6039cd2FcE0890059ED31D5d188e0a23c241A1",
  });

  const bridgeToken = async () => {
    try {
      const amount = parseUnits(sellAmount.toString(), 6);
      const destinationDomain = chains[parseInt(sellToken!)].destinationDomain;

      const { hash } = await writeAsync({
        args: [amount, destinationDomain, address!],
      });

      const { logs } = await publicClientViem.waitForTransactionReceipt({
        hash: hash,
      });

      const log = logs.filter(
        (x) =>
          x?.topics[0]?.toLowerCase() ===
          "0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036".toLowerCase()
      );

      console.log(log);

      const messagedata = decodeEventLog({
        abi: MessageTransmitterABI,
        data: log[0]?.data,
        topics: log[0]?.topics,
      });

      console.log(messagedata);

      const message = messagedata?.args?.message;

      return message;
    } catch (error) {
      console.log(error);
    }
  };

  return { bridgeToken };
}
