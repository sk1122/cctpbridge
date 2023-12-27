import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../button";

export const ConnectETH = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3 flex justify-center items-center gap-2"
                    onClick={openConnectModal}
                  >
                    <img
                      src="/asset/ethereum.webp"
                      alt=""
                      className="w-6 h-6"
                    />
                    Ethereum
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3 flex justify-center items-center gap-2"
                    onClick={openChainModal}
                  >
                    <img
                      src="/asset/ethereum.webp"
                      alt=""
                      className="w-6 h-6"
                    />
                    Wrong Network
                  </button>
                );
              }
              return (
                <button
                  className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3 flex justify-center items-center gap-2"
                  onClick={openAccountModal}
                >
                  <img src="/asset/ethereum.webp" alt="" className="w-6 h-6" />
                  Disconnect
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
