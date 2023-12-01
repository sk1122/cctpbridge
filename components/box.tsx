import useApprove from "@/hooks/useApprove";
import useAttestation from "@/hooks/useAttestation";
import useBridge from "@/hooks/useBridge";
import useRelease from "@/hooks/useRelease";
import useSwitchChain from "@/hooks/useSwitchChain";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import addTransaction from "@/utils/addTransaction";
import updateTransaction from "@/utils/updateTransaction";
import { useState } from "react";
import { useAccount } from "wagmi";
import ArrivalTimeBox from "./ArrivalTimeBox";
import FeesBox from "./FeesBox";
import ReceiverAddress from "./ReceiverAddress";
import SelectChainBox from "./SelectChainBox";
import SwtichChainButton from "./SwtichChainButton";
import { BoxHeader } from "./box-headers";
import { Button } from "./button";
import { ChainAmountInput } from "./chain-amount-input";
import * as Dialog from "@radix-ui/react-dialog";
import Spinner from "./UI/Spinner";
import { ExternalLink } from "lucide-react";

type TransactionDetails = {
  success: boolean;
  transactionHash: null | `0x${string}`;
};

export const Box = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails>({
      success: false,
      transactionHash: null,
    });
  const { isConnected, address } = useAccount();
  const { approveAllowance } = useApprove();
  const { bridgeToken } = useBridge();
  const { sellToken, buyToken, sellAmount, buyAmount } = useTokenStore();
  const { switchChain } = useSwitchChain();

  async function addTransactionToDB(
    srcMessage: `0x${string}`,
    srcTx: `0x${string}`
  ) {
    const srcChain = chains[sellToken].chainId;
    const dstChain = chains[buyToken].chainId;
    const srcToken = chains[sellToken].tokens[0].address;
    const dstToken = chains[buyToken].tokens[0].address;
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

  async function handleBridge() {
    if (!isConnected || sellAmount.length === 0) return;

    try {
      const chainID = await switchChain(chains[sellToken].testnetChainId);

      if (!chainID) return;
      const hash = await approveAllowance();
      if (hash) {
        setStep(1);
        const data = await bridgeToken();
        if (data?.message && data?.transactionHash) {
          await addTransactionToDB(data.message, data.transactionHash);
          setTransactionDetails({
            success: true,
            transactionHash: data?.transactionHash,
          });
          setStep(2);
        } else {
          setTransactionDetails({
            success: false,
            transactionHash: null,
          });
          setStep(2);
        }
      } else {
        setTransactionDetails({
          success: false,
          transactionHash: null,
        });
        setStep(2);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="shadow-2xl border border-[#FF7D1F] shadow-[#FF7D1F] w-full sm:w-[462px] bg-[#070708] rounded-xl h-full flex flex-col px-3 pb-3 justify-center items-center space-y-3">
      <BoxHeader />
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex items-center">
          <SelectChainBox title="From" isFrom={true} />
          <SwtichChainButton />
          <SelectChainBox title="To" isFrom={false} />
        </div>
        <ChainAmountInput />
        <ReceiverAddress />
        <ArrivalTimeBox />
        <FeesBox />
      </div>
      {!isConnected || sellAmount.length === 0 ? (
        <Button active={false} text={"Bridge"} />
      ) : (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button active={true} text={"Bridge"} onClick={handleBridge} />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20" />
            <Dialog.Content className="fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 w-full sm:w-[462px] max-h-[85vh] bg-[#17181C] rounded-lg border border-[#FF7D1F] py-4 px-5 z-20">
              <Dialog.Description className="text-black text-lg font-medium">
                {step === 2 ? (
                  <div className="flex flex-col gap-2">
                    <h1 className="text-white text-xl font-semibold text-center">
                      {transactionDetails?.success
                        ? "Transaction successful"
                        : "Transaction Failed"}
                    </h1>
                    {transactionDetails?.success ? (
                      <>
                        <div className="flex gap-2 items-center justify-center">
                          <p className="text-white text-sm">0x02..33</p>
                          <ExternalLink className="w-4 h-4 text-[#828282]" />
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                          <p className="text-white text-sm">
                            Please click on the icon to claim the transaction
                          </p>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 9H21.9944M21.9944 9H2.00559M21.9944 9C22 9.41261 22 9.87562 22 10.4L21.9944 13M21.9944 9C21.9761 7.6499 21.8979 6.8394 21.564 6.18404C21.1805 5.43139 20.5686 4.81947 19.816 4.43597C18.9603 4 17.8402 4 15.6 4H8.4C6.15979 4 5.03968 4 4.18404 4.43597C3.43139 4.81947 2.81947 5.43139 2.43597 6.18404C2.10205 6.8394 2.02389 7.6499 2.00559 9M2.00559 9H2M2.00559 9C2 9.41261 2 9.87562 2 10.4V13.6C2 15.8402 2 16.9603 2.43597 17.816C2.81947 18.5686 3.43139 19.1805 4.18404 19.564C5.03968 20 6.15979 20 8.4 20H12M18 13H15M19 22V19M19 19V16M19 19H16M19 19H22"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </>
                    ) : null}
                    <Dialog.Close>
                      <Button
                        active={true}
                        text="Take me back"
                        className="bg-white w-full py-2 text-black rounded-lg"
                      />
                    </Dialog.Close>
                  </div>
                ) : (
                  <div className="p-10">
                    <div className="w-10 h-10 mx-auto">
                      <Spinner />
                    </div>
                    <h3 className="text-[#FF7D1F] mt-8 text-center text-xl font-medium">
                      {step === 0
                        ? "Waiting for Token Approval"
                        : "Waiting for Bridge Approval"}
                    </h3>
                  </div>
                )}
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};
