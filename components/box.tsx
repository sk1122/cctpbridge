import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import useApprove from "@/hooks/useApprove";
import useBridge from "@/hooks/useBridge";
import useSwitchChain from "@/hooks/useSwitchChain";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import getAttestation from "@/utils/getAttestation";
import sleep from "@/utils/sleep";
import { keccak256 } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { BoxHeader } from "./box-headers";
import { Button } from "./button";
import { ChainAmountInput } from "./chain-amount-input";
import { CustomConnectButton } from "./custom-connect-button";
import useAttestation from "@/hooks/useAttestation";

export const Box = () => {
  const { isConnected } = useAccount();
  const { approveAllowance } = useApprove();
  const { bridgeToken } = useBridge();
  const { sellToken, buyToken } = useTokenStore();
  const { switchChain } = useSwitchChain();
  const { attestationStatus } = useAttestation();
  const { writeAsync } = useContractWrite({
    abi: MessageTransmitterABI,
    functionName: "receiveMessage",
    address: "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79",
  });

  async function handleBridge() {
    const chainID = await switchChain(
      chains[parseInt(sellToken!) - 1].testnetChainId
    );

    if (!chainID) return;

    const hash = await approveAllowance();
    if (hash) {
      const message = await bridgeToken();
      if (message) {
        const messagehash = keccak256(message);

        const isConfirmed = await attestationStatus(messagehash);

        if (isConfirmed) {
          const chainID = await switchChain(
            chains[parseInt(buyToken!) - 1].testnetChainId
          );
          if (!chainID) return;
          const response = await getAttestation(messagehash);
          const data = await writeAsync({
            args: [message, response.attestation],
          });
          console.log(data);
        }

        const response = await getAttestation(messagehash);
        console.log(response);
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
