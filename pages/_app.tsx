import "@/styles/globals.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { createPublicClient, http } from "viem";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  zora,
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  goerli,
  avalancheFuji,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [goerli, avalancheFuji, arbitrumGoerli, optimismGoerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "CCTP Bridge",
  projectId: "a28e6122aff5f1d2b89776d480ec3c67",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export const publicClientViem = createPublicClient({
  chain: goerli,
  transport: http(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
