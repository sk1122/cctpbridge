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
import { toast, ToastContainer } from "react-toastify";
import { configureChains, createConfig, mainnet, WagmiConfig } from "wagmi";
import { arbitrum, avalanche, base, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, avalanche, arbitrum, optimism, base],
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
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-7P53SDD713" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-7P53SDD713');
            `}
          </Script>
          <Component {...pageProps} />
        </div>
        <Footer />
      </RainbowKitProvider>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </WagmiConfig>
  );
}
