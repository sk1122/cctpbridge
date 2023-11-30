import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import useApprove from "@/hooks/useApprove";
import useAttestation from "@/hooks/useAttestation";
import useBridge from "@/hooks/useBridge";
import useSwitchChain from "@/hooks/useSwitchChain";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import addTransaction from "@/utils/addTransaction";
import getAttestation from "@/utils/getAttestation";
import updateTransaction from "@/utils/updateTransaction";
import { ArrowDownUp } from "lucide-react";
import { useState } from "react";
import { formatEther, keccak256 } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useContractWrite,
  usePublicClient,
} from "wagmi";
import { BoxHeader } from "./box-headers";
import { Button } from "./button";
import { ChainAmountInput } from "./chain-amount-input";
import { ABI } from "@/constants/abi";
import useRelease from "@/hooks/useRelease";

export const Box = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Bridge");
  const { isConnected, address } = useAccount();
  const { approveAllowance } = useApprove();
  const { bridgeToken } = useBridge();
  const {
    sellToken,
    buyToken,
    setSellToken,
    setBuyToken,
    sellAmount,
    buyAmount,
    srcTx,
  } = useTokenStore();
  const { switchChain } = useSwitchChain();
  const { attestationStatus } = useAttestation();
  const { releaseFunds } = useRelease();

  async function addTransactionToDB(
    srcMessage: `0x${string}`,
    srcTx: `0x${string}`
  ) {
    const srcChain = chains[parseInt(sellToken!) - 1].chainId;
    const dstChain = chains[parseInt(buyToken!) - 1].chainId;
    const srcToken = chains[parseInt(sellToken!) - 1].tokens[0].address;
    const dstToken = chains[parseInt(buyToken!) - 1].tokens[0].address;
    const slippage = 1;

    await addTransaction(
      address!,
      address!,
      srcChain,
      srcToken,
      sellAmount,
      srcTx,
      srcMessage,
      dstChain,
      dstToken,
      buyAmount,
      slippage
    );
  }

  async function updateTransactionOfDB(srcTx: `0x${string}`, dstTx: string) {
    console.log(srcTx, dstTx);
    await updateTransaction(srcTx, dstTx, false);
  }

  async function handleBridge() {
    if (!buyToken && !sellToken && !isConnected) return;
    if (buyToken === sellToken) return;

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
        const data = await bridgeToken();
        if (data?.message && data?.transactionHash) {
          await addTransactionToDB(data.message, data.transactionHash);

          const messagehash = keccak256(data.message);
          const isConfirmed = await attestationStatus(messagehash);

          if (isConfirmed) {
            const chainID = await switchChain(
              chains[parseInt(buyToken!) - 1].testnetChainId
            );
            if (!chainID) return;
            const response = await getAttestation(messagehash);
            const hash = await releaseFunds(data.message, response.attestation);
            if (!hash) return;
            console.log(hash);
            await updateTransactionOfDB(data?.transactionHash, hash);
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
    <div className="shadow-2xl border border-[#FF7D1F] shadow-[#FF7D1F] w-full sm:w-[462px] bg-[#070708] rounded-xl h-full flex flex-col px-3 pb-3 justify-center items-center space-y-3">
      <BoxHeader />
      <div className="w-full h-full">
        <ChainAmountInput />
        <div className="flex justify-center -my-2.5">
          <button
            className="bg-gray-800 p-1.5 rounded-full"
            onClick={() => {
              if (sellToken && buyToken) {
                setSellToken(buyToken);
                setBuyToken(sellToken);
              }
            }}
          >
            <ArrowDownUp className="w-4 h-4 " />
          </button>
        </div>
      </div>
      <Button
        active={
          buyToken && sellToken && isConnected && buyToken !== sellToken
            ? true
            : false
        }
        isLoading={isLoading}
        text={buttonText}
        onClick={handleBridge}
      />
    </div>
  );
};
