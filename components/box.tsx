import { useAccount, useContractWrite } from "wagmi";
import { BoxHeader } from "./box-headers";
import { Button } from "./button";
import { ChainAmountInput } from "./chain-amount-input";
import { CustomConnectButton } from "./custom-connect-button";
import useBridge from "@/hooks/useBridge";
import useApprove from "@/hooks/useApprove";
import getAttestation from "@/utils/getAttestation";
import sleep from "@/utils/sleep";
import { useTokenStore } from "@/store";
import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import { keccak256 } from "viem";

export const Box = () => {
  const { isConnected } = useAccount();
  const { approveAllowance } = useApprove();
  const { bridgeToken } = useBridge();
  const { sellToken, buyToken } = useTokenStore();
  const { writeAsync } = useContractWrite({
    abi: MessageTransmitterABI,
    functionName: "receiveMessage",
    address: "0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79",
  });

  async function handleBridge() {
    const data = await writeAsync({
      args: [
        "0x000000000000000000000001000000000003abd4000000000000000000000000d0c3da58f55358142b8d3e06c1c30c5c6114efe8000000000000000000000000eb08f243e5d3fcff26a9e38ae5520a669f4019d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007865c6e87b9f70255377e024ace6630c1eaa37f000000000000000000000000fa92ce12b5e93710668e28042d8f5d18b801fdea0000000000000000000000000000000000000000000000000000000000030d400000000000000000000000000e6039cd2fce0890059ed31d5d188e0a23c241a1",
        "0x06e9b5a1aa5cba5fa8f6574fd62841e0d076ec32fdc61ef9aedefe817c222f2b3997035d47201639355d2678e9a3f538cfed91cb8cd8dccf131fbda6e737580e1b35dd0641b8aae9320b15c6f33de84703b20a08f79e35384d4753f8505ecf508143bb2eabb63b783e087de378159d88f1f9a49d6b2ca98cf4e32bc8f8eeb688021b",
      ],
    });
    console.log(data);

    return;

    const hash = await approveAllowance();
    if (hash) {
      const message = await bridgeToken();
      if (message) {
        const messagehash = keccak256(message);
        const response = await getAttestation(messagehash);
        console.log(response);
        if (response.status === "complete") {
          console.log("Status = complete");
          try {
            const data = await writeAsync({
              args: [message, response.attestation],
            });
            return data;
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("Status = pending");
          while (response.status === "pending_confirmations") {
            try {
              const response = await getAttestation(messagehash);
              if (response.status === "complete") {
                console.log("Status = complete");
                try {
                  const data = await writeAsync({
                    args: [message, response.attestation],
                  });
                  return data;
                } catch (error) {
                  console.log(error);
                }
                break;
              } else {
                await sleep(5000);
                continue;
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }
  }

  return (
    <div className="shadow-2xl shadow-cyan-500 w-[462px] bg-black rounded-xl h-full flex flex-col px-3 pb-3 justify-center items-center space-y-3">
      <BoxHeader />
      <div className="w-full h-full space-y-2">
        <ChainAmountInput text="You Pay" payingToken={true} />
        <ChainAmountInput text="You Get" payingToken={false} />
      </div>
      {isConnected ? (
        <Button
          text="Bridge"
          active={buyToken && sellToken ? true : false}
          onClick={handleBridge}
        />
      ) : (
        <CustomConnectButton />
      )}
    </div>
  );
};
