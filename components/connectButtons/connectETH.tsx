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
                    className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3"
                    onClick={openConnectModal}
                  >
                    Etheruem
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    text="Wrong network"
                    active={true}
                    onClick={openChainModal}
                  />
                );
              }
              return (
                <button
                  className="bg-transparent px-10 py-3 border-2 border-[#FF7D1F] rounded-full font-bold"
                  onClick={openAccountModal}
                >
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
