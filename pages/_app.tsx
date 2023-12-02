import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrumGoerli,
  avalancheFuji,
  baseGoerli,
  goerli,
  optimismGoerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [goerli, avalancheFuji, arbitrumGoerli, optimismGoerli, baseGoerli],
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <div className="bg-[url('/hero.svg')]">
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
