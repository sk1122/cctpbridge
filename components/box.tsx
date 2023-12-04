import { USDCCONTRACTS } from "@/constants/address";
import useApprove from "@/hooks/useApprove";
import useBridge from "@/hooks/useBridge";
import useCanBridge from "@/hooks/useCanBridge";
import useSwitchChain from "@/hooks/useSwitchChain";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import addTransaction from "@/utils/addTransaction";
import formatAddress from "@/utils/formatAddress";
import { Player } from "@lottiefiles/react-lottie-player";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ArrivalTimeBox from "./ArrivalTimeBox";
import FeesBox from "./FeesBox";
import ReceiverAddress from "./ReceiverAddress";
import SelectChainBox from "./SelectChainBox";
import SwtichChainButton from "./SwtichChainButton";
import TransactionsIcon from "./UI/Icons/TransactionsIcon";
import Spinner from "./UI/Spinner";
import { BoxHeader } from "./box-headers";
import { Button } from "./button";
import { ChainAmountInput } from "./chain-amount-input";
import getTimeDifference from "@/utils/getTimeDifference";

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
  const {
    sellToken,
    buyToken,
    sellAmount,
    receiverAddress,
    isReceiverAddress,
    balance,
  } = useTokenStore();
  const { switchChain } = useSwitchChain();
  const { validate } = useCanBridge();
  const [canBridge, setCanBridge] = useState<boolean>(false);

  async function addTransactionToDB(
    srcMessage: `0x${string}`,
    srcTx: `0x${string}`
  ) {
    const srcChain = chains[sellToken].chainId;
    const dstChain = chains[buyToken].chainId;
    const srcToken = USDCCONTRACTS[sellToken].mainnetContract;
    const dstToken = USDCCONTRACTS[buyToken].mainnetContract;
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
      sellAmount,
      slippage
    );
  }

  async function handleBridge() {
    if (!isConnected || sellAmount.length === 0) return;

    try {
      const chainID = await switchChain(chains[sellToken].chainId);

      if (!chainID) {
        setTransactionDetails({
          success: false,
          transactionHash: null,
        });
        setStep(2);
      }
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

  useEffect(() => {
    const isvalid = validate();
    setCanBridge(isvalid);
  }, [isConnected, receiverAddress, balance, sellAmount, isReceiverAddress]);

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
      {!canBridge ? (
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
                        <Player
                          src={
                            "https://lottie.host/70fe85c3-eff9-480d-a4fb-bea1bd9e5423/vhXw9v6j07.json"
                          }
                          autoplay
                          speed={1}
                          keepLastFrame
                          className="w-28 h-28"
                        />
                        <div className="flex gap-2 items-center justify-center">
                          <p className="text-white text-sm">
                            {formatAddress(
                              transactionDetails?.transactionHash!
                            )}
                          </p>
                          <ExternalLink className="w-4 h-4 text-[#828282]" />
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                          <p className="text-white text-sm">
                            Please click on the icon to claim the transaction
                          </p>
                          <div className="w-4 h-4">
                            <TransactionsIcon />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Player
                        src="https://lottie.host/8964c02e-4ac2-457c-b527-7e973199d9b6/1XdEr5bYFW.json"
                        autoplay={true}
                        speed={1}
                        keepLastFrame
                        className="w-28 h-28"
                      />
                    )}
                    <Dialog.Close>
                      <Button
                        active={true}
                        text="Take me back"
                        className="bg-white w-full py-2 text-black rounded-lg"
                        onClick={() => {
                          setStep(0);
                        }}
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
