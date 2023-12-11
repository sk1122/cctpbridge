type Contracts = {
  id: number;
  network: string;
  testnetContract: `0x${string}`;
  mainnetContract: `0x${string}`;
};

export const RPC = [
  {
    id: 0,
    network: "ethereum",
    testnetRPC: "https://rpc.ankr.com/eth_goerli",
    mainnetRPC: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ETH_MAINNET_RPC}`,
  },
  {
    id: 1,
    network: "polygon",
    testnetRPC: "https://rpc.ankr.com/polygon_mumbai",
    mainnetRPC: "https://rpc.ankr.com/polygon",
  },
  {
    id: 2,
    network: "avalanche",
    testnetRPC: "https://rpc.ankr.com/avalanche_fuji",
    mainnetRPC: "https://rpc.ankr.com/avalanche",
  },
  {
    id: 3,
    network: "arbitrum",
    testnetRPC: "https://goerli-rollup.arbitrum.io/rpc",
    mainnetRPC:
      `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ARB_MAINNET_RPC}`,
  },
  {
    id: 4,
    network: "optimism",
    testnetRPC: "https://rpc.ankr.com/optimism_testnet",
    mainnetRPC: "https://rpc.ankr.com/optimism",
  },
  {
    id: 5,
    network: "base",
    testnetRPC: "https://rpc.ankr.com/base_goerli",
    mainnetRPC: "https://rpc.ankr.com/base",
  },
];

export const USDCCONTRACTS: Contracts[] = [
  {
    id: 0,
    network: "ethereum",
    testnetContract: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
    mainnetContract: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  {
    id: 1,
    network: "polygon",
    testnetContract: "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97",
    mainnetContract: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
  },
  {
    id: 2,
    network: "avalanche",
    testnetContract: "0x5425890298aed601595a70ab815c96711a31bc65",
    mainnetContract: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  },
  {
    id: 3,
    network: "arbitrum",
    testnetContract: "0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63",
    mainnetContract: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  {
    id: 4,
    network: "optimism",
    testnetContract: "0xe05606174bac4A6364B31bd0eCA4bf4dD368f8C6",
    mainnetContract: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
  },
  {
    id: 5,
    network: "base",
    testnetContract: "0xf175520c52418dfe19c8098071a252da48cd1c19",
    mainnetContract: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
];

export const BRIDGECONTRACTS: Contracts[] = [
  {
    id: 0,
    network: "ethereum",
    testnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
    mainnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
  },
  {
    id: 1,
    network: "polygon",
    testnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
    mainnetContract: "0x",
  },
  {
    id: 2,
    network: "avalanche",
    testnetContract: "0x39c925A3c08748E74A57f7d452ECd4caea26e92c",
    mainnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
  },
  {
    id: 3,
    network: "arbitrum",
    testnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
    mainnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
  },
  {
    id: 4,
    network: "optimism",
    testnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
    mainnetContract: "0xe3edd42194D9B12781F1ed5f687328Ac764bEf02",
  },
  {
    id: 5,
    network: "base",
    testnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
    mainnetContract: "0xaED012a51BBa208b270fD2B17f3417f6bd7d771a",
  },
];
