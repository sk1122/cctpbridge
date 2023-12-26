import { USDCABI } from "@/constants/abi/USDC";
import { RPC, USDCCONTRACTS } from "@/constants/address";
import { useTokenStore } from "@/store";
import { useCosmosStore } from "@/store/cosmos";
import { SigningStargateClient } from "@cosmjs/stargate";
import { createPublicClient, formatUnits, http } from "viem";
import { useAccount } from "wagmi";

export default function useBal() {
  const { sellToken } = useTokenStore();
  const { address } = useAccount();
  const { address: cosmosAddress } = useCosmosStore();

  async function getETHChainBalance() {
    if (!address) return;
    const rpc = createPublicClient({
      transport: http(RPC[sellToken].testnetRPC),
    });

    const balance = await rpc.readContract({
      abi: USDCABI,
      address: USDCCONTRACTS[sellToken].testnetContract as `0x${string}`,
      functionName: "balanceOf",
      args: [address!],
    });

    return formatUnits(balance, 6);
  }

  async function getCosmosChainBalanace() {
    if (!window.keplr || !cosmosAddress) return;

    const offlineSigner = window.keplr.getOfflineSigner("grand-1");
    const signingClient = await SigningStargateClient.connectWithSigner(
      "https://rpc.testnet.noble.strange.love",
      offlineSigner
    );
    const data = await signingClient.getBalance(cosmosAddress, "uusdc");
    const balance = parseInt(data.amount) / 1000000;
    return balance.toString();
  }

  async function getBalance() {
    try {
      // index of cosmos is 8
      if (sellToken === 8) {
        return getCosmosChainBalanace();
      } else {
        return getETHChainBalance();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { getBalance };
}
