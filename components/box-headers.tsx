import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeftRight, Cog, X } from "lucide-react";

export const BoxHeader = () => {
  return (
    <div className="p-5 w-full h-full flex justify-between items-center">
      <div className="w-full h-full flex justify-start items-center space-x-4">
        <h1>Swap</h1>
      </div>
      <div className="w-full h-full flex justify-end items-center space-x-4">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button>
              <Cog />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 max-w-md max-h-[85vh] bg-white rounded-lg">
              <div className="p-4 flex justify-between items-center">
                <Dialog.Title className="text-black text-xl font-semibold">
                  Edit profile
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-black" aria-label="Close">
                    <X />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="text-black text-lg font-medium p-4">
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button>
              <ArrowLeftRight />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            <Dialog.Content className="fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 max-w-md max-h-[85vh] bg-white rounded-lg">
              <div className="p-4 flex justify-between items-center">
                <Dialog.Title className="text-black text-xl font-semibold">
                  Previous Transactions
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="text-black" aria-label="Close">
                    <X />
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Description className="text-black text-lg font-medium p-4">
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};
