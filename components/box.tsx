import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import useApprove from "@/hooks/useApprove";
import useAttestation from "@/hooks/useAttestation";
import useBridge from "@/hooks/useBridge";
import useSwitchChain from "@/hooks/useSwitchChain";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import getAttestation from "@/utils/getAttestation";
import { useState } from "react";
import { keccak256 } from "viem";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { BoxHeader } from "./box-headers";
import { Button } from "./button";
import { ChainAmountInput } from "./chain-amount-input";
import { CustomConnectButton } from "./custom-connect-button";
import addTransaction from "@/utils/addTransaction";
import updateTransaction from "@/utils/updateTransaction";

export const Box = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Bridge");
  const { isConnected, address } = useAccount();
  const { approveAllowance } = useApprove();
  const { bridgeToken } = useBridge();
  const { sellToken, buyToken, sellAmount, buyAmount, setSrcTx, srcTx } =
    useTokenStore();
  const { switchChain } = useSwitchChain();
  const { attestationStatus } = useAttestation();
  const { writeAsync } = useContractWrite({
    abi: MessageTransmitterABI,
    functionName: "receiveMessage",
    address: "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79",
  });

  async function addTransactionToDB(srcTx: string) {
    const srcChain = chains[parseInt(sellToken!) - 1].chainId;
    const dstChain = chains[parseInt(buyToken!) - 1].chainId;
    const slippage = 1;

    await addTransaction(
      address!,
      address!,
      srcChain,
      sellAmount,
      srcTx,
      dstChain,
      buyAmount,
      slippage
    );

    setSrcTx(srcTx);
  }

  async function updateTransactionOfDB(dstTx: string) {
    if (!srcTx) return;

    await updateTransaction(srcTx, dstTx, false);
  }

  async function handleBridge() {
    try {
      setIsLoading(true);
      setButtonText("");
      const chainID = await switchChain(
        chains[parseInt(sellToken!) - 1].testnetChainId
      );

      if (!chainID) return;
      setButtonText("approving");
      const hash = await approveAllowance();
      if (hash) {
        setButtonText("bridging");
        const message = await bridgeToken();
        if (message) {
          const messagehash = keccak256(message);

          await addTransactionToDB(messagehash);

          const isConfirmed = await attestationStatus(messagehash);

          if (isConfirmed) {
            const chainID = await switchChain(
              chains[parseInt(buyToken!) - 1].testnetChainId
            );
            if (!chainID) return;
            const response = await getAttestation(messagehash);
            const { hash } = await writeAsync({
              args: [message, response.attestation],
            });

            console.log(hash);
            await updateTransactionOfDB(hash);
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setButtonText("Bridge");
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
          active={buyToken && sellToken ? true : false}
          isLoading={isLoading}
          text={buttonText}
          onClick={handleBridge}
        />
      ) : (
        <CustomConnectButton />
      )}
    </div>
  );
};
