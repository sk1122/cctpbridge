import { MsgReceiveMessage } from "@/generated/circle/cctp/v1/tx";
import { useCosmosStore } from "@/store/cosmos";
import { GeneratedType, Registry, coins } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

const chainId = "grand-1";

export default function useCosmos() {
  const { setAddress, address } = useCosmosStore();

  async function withdrawTokens(nonce: string, attestation: string) {
    try {
      if (!window.keplr) return;
      console.log(address);

      const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
        ["/circle.cctp.v1.MsgReceiveMessage", MsgReceiveMessage],
      ];

      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const signingClient = await SigningStargateClient.connectWithSigner(
        "https://rpc.testnet.noble.strange.love",
        offlineSigner,
        {
          registry: new Registry(cctpTypes),
        }
      );

      const msg = {
        typeUrl: "/circle.cctp.v1.MsgReceiveMessage",
        value: {
          message: {
            destinationDomain: 4,
            version: 0,
            nonce: nonce,
          },
          attestation: attestation,
        },
      };

      const fee = {
        amount: [
          {
            denom: "uusdc",
            amount: "0.2",
          },
        ],
        gas: "200000",
      };

      const memo = "";

      console.log(address!, [msg], fee, memo);

      const result = await signingClient.signAndBroadcast(
        "noble1zuk9npsktr9fyh7hu2fws9693vn9nz4gyhy6pg",
        [msg],
        fee,
        memo
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function connect() {
    try {
      if (!window.keplr) return;
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      setAddress(accounts[0].address);
    } catch (error) {
      console.log(error);
    }
  }

  return { connect, withdrawTokens };
}
