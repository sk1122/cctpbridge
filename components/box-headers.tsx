import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeftRight, Cog, X } from "lucide-react";
import Transactions from "./transactions";
import Slippage from "./slippage";
import { useAccount } from "wagmi";

export const BoxHeader = () => {
  const { isConnected } = useAccount();
  return (
    <div className="p-5 w-full h-full flex justify-between items-center">
      <h1 className="font-semibold text-xl">Bridge</h1>
      <div className="w-full h-full flex justify-end items-center space-x-4">
        {/* <Dialog.Root>
          <Dialog.Trigger asChild>
            <button>
              <Cog />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 max-w-md max-h-[85vh] bg-[#070708] rounded-lg">
              <div className="p-4 flex justify-between items-center">
                <Dialog.Title className="text-white text-xl font-semibold">
                  Slippage
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    className="text-white bg-[#17181C] border border-[#585858] rounded-full p-1"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="text-black text-lg font-medium p-4">
                <Slippage />
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root> */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            {isConnected && (
              <button>
                <ArrowLeftRight />
              </button>
            )}
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 max-w-3xl max-h-[85vh] bg-[#070708] rounded-lg border border-[#FF7D1F]">
              <div className="flex justify-between items-center p-4">
                <Dialog.Title className="text-white text-xl font-semibold">
                  Your Transactions
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    className="text-white bg-[#17181C] border border-[#585858] rounded-full p-1"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="text-black text-lg font-medium">
                <Transactions />
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};
