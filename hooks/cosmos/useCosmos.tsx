import {
  MsgReceiveMessage,
  MsgDepositForBurn,
} from "@/generated/circle/cctp/v1/tx";
import { chains } from "@/lib/data";
import { useTokenStore } from "@/store";
import { useCosmosStore } from "@/store/cosmos";
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
  interface Window extends KeplrWindow {}
}

const chainId = "grand-1";

export default function useCosmos() {
  const { setAddress, address } = useCosmosStore();
  const { receiverAddress, buyToken, sellAmount } = useTokenStore();

  async function withdrawTokens(nonce: string, attestation: string) {
    try {
      if (!window.keplr || !address) return;
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

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function depositTokens() {
    try {
      if (!window.keplr || !address || !receiverAddress) return;
      console.log(address);

      const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
        ["/circle.cctp.v1.MsgDepositForBurn", MsgDepositForBurn],
      ];

      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const signingClient = await SigningStargateClient.connectWithSigner(
        "https://rpc.testnet.noble.strange.love",
        offlineSigner,
        {
          registry: new Registry(cctpTypes),
        }
      );

      const rawMintRecipient = receiverAddress;
      const cleanedMintRecipient = rawMintRecipient.replace(/^0x/, "");
      const zeroesNeeded = 64 - cleanedMintRecipient.length;
      const mintRecipient = "0".repeat(zeroesNeeded) + cleanedMintRecipient;
      const buffer = Buffer.from(mintRecipient, "hex");
      const mintRecipientBytes = new Uint8Array(buffer);

      const msg = {
        typeUrl: "/circle.cctp.v1.MsgDepositForBurn",
        value: {
          from: address,
          amount: BigInt(sellAmount),
          destinationDomain: chains[buyToken].destinationDomain,
          mintRecipient: mintRecipientBytes,
          burnToken: "uusdc",
        },
      };

      const fee = {
        amount: [
          {
            denom: "uusdc",
            amount: "1",
          },
        ],
        gas: "200000",
      };

      const memo = "";

      const result = await signingClient.signAndBroadcast(
        address!,
        [msg],
        fee,
        memo
      );

      console.log(result);

      return result;
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
      console.log(accounts);
      setAddress(accounts[0].address);
    } catch (error) {
      console.log(error);
    }
  }

  function disconnect() {
    try {
      setAddress(undefined);
    } catch (error) {
      console.log(error);
    }
  }

  return { connect, disconnect, withdrawTokens, depositTokens };
}
