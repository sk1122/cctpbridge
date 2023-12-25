import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Search, X } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";

export default function SelectChainBox({
  title,
  isFrom,
}: {
  title: string;
  isFrom: boolean;
}) {
  const [searchItem, setSearchItem] = useState("");
  const [filteredChains, setFilteredChains] = useState(chains);
  const {
    setSellToken,
    sellToken,
    setBuyToken,
    buyToken,
    setIsReceiverAddress,
  } = useTokenStore();

  const handleInputChange = (e: { target: { value: string } }) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = chains.filter((chain) =>
      chain.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredChains(filteredItems);
  };

  return (
    <div className="bg-[#17181C] text-[#7A7A7A] rounded-xl px-4 py-2 border border-[#464646] w-full">
      <p className="font-medium">{title}</p>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div className="flex items-center justify-between text-white cursor-pointer mt-2">
            <p className="font-semibold text-[#FF7D1F] text-xl">
              {isFrom ? chains[sellToken].name : chains[buyToken].name}
            </p>
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-20" />
          <Dialog.Content className="fixed top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4 w-full sm:w-[462px] max-h-[85vh] bg-[#17181C] rounded-lg border border-[#464646] py-4 px-5 z-20">
            <div className="flex justify-between items-center mt-2">
              <Dialog.Title className="text-white text-xl font-semibold">
                Select Network
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-white" aria-label="Close">
                  <X className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="text-black text-lg font-medium mt-4">
              <div className="flex items-center bg-[#131316] border border-[#464646] rounded-xl">
                <Search className="w-5 h-5 text-white ml-4" />
                <Input
                  className={"text-lg bg-transparent text-white"}
                  placeholder="Search"
                  value={searchItem}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                {filteredChains.map((chain, index) => {
                  if (chain.isSupported) {
                    return (
                      <Dialog.Close
                        asChild
                        key={index}
                        onClick={() => {
                          if (isFrom && index === buyToken) {
                            setBuyToken(sellToken);
                            setSellToken(index);
                          }
                          if (!isFrom && index === sellToken) {
                            setSellToken(buyToken);
                            setBuyToken(index);
                          }
                          if (!isFrom && buyToken === 8) {
                            setIsReceiverAddress(true);
                          }
                          isFrom ? setSellToken(index) : setBuyToken(index);
                        }}
                      >
                        <div className="flex items-center px-2 py-2 gap-3 hover:bg-[#2B2B2B] cursor-pointer rounded-lg">
                          <img
                            src={chain.logoURI}
                            alt={chain.name}
                            className="w-8 h-8 rounded-lg"
                          />
                          <h1 className="text-xl text-white">{chain.name}</h1>
                        </div>
                      </Dialog.Close>
                    );
                  } else {
                    return (
                      <div
                        className="flex items-center justify-between px-2 py-2 rounded-lg"
                        key={index}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={chain.logoURI}
                            alt={chain.name}
                            className="w-8 h-8 rounded-lg"
                          />
                          <h1 className="text-xl text-white">{chain.name}</h1>
                        </div>
                        <p className="font-semibold text-sm text-white">
                          (Coming soon)
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
