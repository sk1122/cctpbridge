import { useTokenStore } from "@/store";
import { isAddress } from "viem";
import { useAccount } from "wagmi";

export default function useCanBridge() {
  const { isConnected } = useAccount();
  const { sellAmount, isReceiverAddress, receiverAddress, balance, buyToken } =
    useTokenStore();

  function validate() {
    console.log(buyToken);
    if (isConnected && sellAmount.length > 0 && sellAmount !== "0") {
      if (balance) {
        if (balance >= sellAmount) {
          if (isReceiverAddress) {
            if (buyToken === 8 && receiverAddress.includes("noble")) {
              return true;
            }
            if (isAddress(receiverAddress)) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
    }
    return false;
  }

  return { validate };
}
