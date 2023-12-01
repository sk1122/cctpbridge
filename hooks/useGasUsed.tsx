import { createPublicClient, http } from "viem";

export const useGasUsed = () => {
  const gasUsed = 3000_00;
  const networks = [
    {
      id: 0,
      network: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      coinGeckoId: "ethereum",
      url: "https://rpc.ankr.com/eth_goerli",
      website: "https://ethereum.org/",
      image: "/networks/ethereum_logo.png",
      type: "Layer 1",
    },
    {
      id: 3,
      network: "arbitrum",
      symbol: "ETH",
      name: "Arbitrum One",
      coinGeckoId: "ethereum",
      url: "https://arb-mainnet.g.alchemy.com/v2/y141okG6TC3PecBM1mL0BfST9f4WQmLx",
      website: "https://offchainlabs.com/",
      image: "/networks/arbitrum_one_logo.jpeg",
      type: "Layer 2",
    },
    {
      id: 4,
      network: "optimism",
      symbol: "ETH",
      name: "Optimism",
      coinGeckoId: "ethereum",
      url: "https://rpc.ankr.com/optimism_testnet",
      website: "https://optimism.io/",
      image: "/networks/optimism_logo.jpeg",
      type: "Layer 2",
    },
    {
      id: 2,
      network: "avalanche",
      name: "Avalanche",
      symbol: "AVAX",
      coinGeckoId: "avalanche-2",
      url: "https://rpc.ankr.com/avalanche_fuji",
      website: "https://www.avax.network/",
      image: "/networks/avalanche_logo.png",
      type: "Sidechain",
    },
    {
      id: 1,
      network: "polygon",
      name: "Polygon",
      symbol: "MATIC",
      coinGeckoId: "matic-network",
      url: "",
      website: "https://hermez.io/",
      image: "/networks/polygon_logo.png",
      type: "Sidechain",
    },
  ];

  const fetchFiatRates = async (chain: number) => {
    console.log(chain, "heee");
    const ids = networks.find((network) => network.id === chain)!.coinGeckoId;
    const vsCurrencies = "USD";

    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

    try {
      const response = await fetch(apiUrl, {
        next: { revalidate: 100 },
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data[ids].usd;
    } catch (error) {
      console.error("Error fetching fiat rates:", error);
      return null;
    }
  };

  const fetchGasPrices = async (chain: number) => {
    const url = networks.find((network) => network.id === chain)!.url;
    const rpc = createPublicClient({
      transport: http(url),
    });

    const gas = await rpc.getGasPrice();

    return gas;
  };

  const invoke = async (chain: number): Promise<number> => {
    const fiat = Number(await fetchFiatRates(chain));
    const gas = Number(await fetchGasPrices(chain));

    const usdPrice = (fiat * gas * gasUsed) / 1000_000_000;

    return usdPrice;
  };

  return {
    invoke,
  };
};
