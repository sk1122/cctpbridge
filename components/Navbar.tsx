import * as Popover from "@radix-ui/react-popover";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import ConnectCosmos from "./connectButtons/connectCosmos";
import { ConnectETH } from "./connectButtons/connectETH";

export default function Navbar() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openAccountModal } = useAccountModal();

  const isHomePage = router.asPath === "/";

  return (
    <div className="container mx-auto py-5 flex justify-between items-center px-4">
      <img
        className="cursor-pointer"
        src="/logo.svg"
        alt=""
        onClick={() => {
          router.push("/");
        }}
      />
      {isHomePage ? (
        <button
          className="bg-transparent px-10 py-3 border-2 border-[#FF7D1F] rounded-full font-bold"
          onClick={() => router.push("/bridge")}
        >
          Launch app
        </button>
      ) : (
        <>
          {isConnected ? (
            <button
              className="bg-transparent px-10 py-3 border-2 border-[#FF7D1F] rounded-full font-bold"
              onClick={openAccountModal}
            >
              Disconnect
            </button>
          ) : (
            <Popover.Root>
              <Popover.Trigger asChild>
                <button className="bg-transparent px-10 py-3 border-2 border-[#FF7D1F] rounded-full font-bold">
                  Connect wallet
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="bg-black border-2 border-[#FF7D1F] rounded-xl p-4 w-60"
                  sideOffset={5}
                >
                  <h1 className="font-semibold text-white text-lg text-center">
                    Choose chain
                  </h1>
                  <div className="mt-4 flex flex-col space-y-2">
                    <ConnectETH />
                    <ConnectCosmos />
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          )}
        </>
      )}
    </div>
  );
}
