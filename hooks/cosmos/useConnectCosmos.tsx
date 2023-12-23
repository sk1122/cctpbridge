import { useCosmosStore } from "@/store/cosmos";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

export default function useConnectCosmos() {
  const { setAddress } = useCosmosStore();

  async function connect() {
    if (!window.keplr) {
      return;
    } else {
      const chainId = "noble-1";
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      setAddress(accounts[0].address);
      //   console.log(accounts);
      const signingClient = await SigningStargateClient.connectWithSigner(
        "",
        offlineSigner
      );
    }
  }

  return { connect };
}
