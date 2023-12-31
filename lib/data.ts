export type Token = {
  address: string;
  name: string;
  chainId: number;
  symbol: string;
  logoURI: string;
  decimals: number;
};

export type Chain = {
  id: number;
  rpc: string;
  chainId: number;
  logoURI: string;
  name: string;
  tokens: Token[];
  isSupported: boolean;
};

export const evmChainData: Chain[] = [
  {
    id: 1,
    chainId: 1,
    name: "ETH",
    logoURI: "/asset/ethereum.webp",
    rpc: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    tokens: [
      {
        name: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        chainId: 1,
        symbol: "USDC",
        logoURI: "/asset/usdc.webp",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chainId: 1,
        symbol: "USDT",
        logoURI: "/asset/usdt.webp",
        decimals: 6,
      },
      {
        name: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        chainId: 1,
        symbol: "DAI",
        logoURI: "/asset/dai.webp",
        decimals: 6,
      },
      {
        name: "Eth",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 1,
        symbol: "ETH",
        logoURI: "/asset/ethereum.webp",
        decimals: 18,
      },
    ],
    isSupported: true
  },
  {
    id: 2,
    chainId: 137,
    name: "POL",
    rpc: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    logoURI: "/asset/matic.webp",
    tokens: [
      {
        name: "USDC",
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        chainId: 137,
        symbol: "USDC",
        logoURI: "/asset/usdc.webp",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        chainId: 137,
        symbol: "USDT",
        logoURI: "/asset/usdt.webp",
        decimals: 6,
      },
      {
        name: "DAI",
        address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
        chainId: 137,
        symbol: "DAI",
        logoURI: "/asset/dai.webp",
        decimals: 6,
      },
      {
        name: "MATIC",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 137,
        symbol: "POL",
        logoURI: "/asset/matic.webp",
        decimals: 18,
      },
    ],
    isSupported: false
  },
  {
    id: 4,
    chainId: 43114,
    name: "AVAX",
    rpc: "https://eth-mainnet.g.alchemy.com/v2/",
    logoURI: "/asset/avalanche.webp",
    tokens: [
      {
        name: "USDC",
        address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
        chainId: 137,
        symbol: "USDC",
        logoURI: "/asset/usdc.webp",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
        chainId: 137,
        symbol: "USDT",
        logoURI: "/asset/usdt.webp",
        decimals: 6,
      },
      {
        name: "DAI",
        address: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
        chainId: 137,
        symbol: "DAI",
        logoURI: "/asset/dai.webp",
        decimals: 6,
      },
      {
        name: "AVAX",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 137,
        symbol: "AVAX",
        logoURI: "/asset/avalanche.webp",
        decimals: 18,
      },
    ],
    isSupported: true
  },
  {
    id: 6,
    chainId: 42161,
    name: "ARB",
    rpc: `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    logoURI: "/asset/arb.webp",
    tokens: [
      {
        name: "USDC",
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        chainId: 42161,
        symbol: "USDC",
        logoURI: "/asset/usdc.webp",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        chainId: 42161,
        symbol: "USDT",
        logoURI: "/asset/usdt.webp",
        decimals: 6,
      },
      {
        name: "DAI",
        address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        chainId: 42161,
        symbol: "DAI",
        logoURI: "/asset/dai.webp",
        decimals: 6,
      },
      {
        name: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 42161,
        symbol: "ETH",
        logoURI: "/asset/ethereum.webp",
        decimals: 18,
      },
    ],
    isSupported: true
  },
  {
    id: 5,
    chainId: 10,
    name: "OPT",
    rpc: `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    logoURI: "/asset/opt.webp",
    tokens: [
      {
        name: "USDC",
        address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        chainId: 10,
        symbol: "USDC",
        logoURI: "/asset/usdc.webp",
        decimals: 6,
      },
      {
        name: "USDT",
        address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        chainId: 10,
        symbol: "USDT",
        logoURI: "/asset/usdt.webp",
        decimals: 6,
      },
      {
        name: "DAI",
        address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
        chainId: 10,
        symbol: "DAI",
        logoURI: "/asset/dai.webp",
        decimals: 6,
      },
      {
        name: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 10,
        symbol: "ETH",
        logoURI: "/asset/ethereum.webp",
        decimals: 18,
      },
    ],
    isSupported: true
  },
];

export const solanaChainData: Chain[] = [
  {
    id: 7,
    chainId: 12465,
    name: "SOL",
    rpc: `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    logoURI: "/asset/solana.webp",
    tokens: [
      {
        name: "USDC",
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        chainId: 12465,
        symbol: "USDC",
        logoURI: "/asset/usdc.webp",
        decimals: 10,
      },
      {
        name: "USDT",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        chainId: 12465,
        symbol: "USDT",
        logoURI: "/asset/usdt.webp",
        decimals: 10,
      },
      {
        name: "SOL",
        address: "1111111111111111111111111111111111111111111",
        chainId: 12465,
        symbol: "SOL",
        logoURI: "/asset/solana.webp",
        decimals: 10,
      },
    ],
    isSupported: false
  },
];

export const aptosChainData: Chain[] = [
  {
    id: 8,
    chainId: 12466,
    name: "APT",
    rpc: "https://eth-mainnet.g.alchemy.com/v2/",
    logoURI: "/asset/aptos.webp",
    tokens: [
      {
        name: "USDC",
        address:
          "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC",
        chainId: 12466,
        symbol: "USDC",
        logoURI: "/asset/usdc.webp",
        decimals: 10,
      },
      {
        name: "USDT",
        address:
          "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDT",
        chainId: 12466,
        symbol: "USDT",
        logoURI: "/asset/usdt.webp",
        decimals: 10,
      },
      {
        name: "APT",
        address: "1111111111111111111111111111111111111111111",
        chainId: 12466,
        symbol: "APT",
        logoURI: "/asset/aptos.webp",
        decimals: 10,
      },
    ],
    isSupported: false
  },
];

export const explorerLinks: any = {
  1: "https://etherscan.io/tx/",
  2: "https://polygonscan.com/tx/",
  3: "https://bscscan.com/tx/",
  4: "https://avascan.info/blockchain/c/tx/",
  5: "https://optimistic.etherscan.io/tx/",
  6: "https://arbiscan.io/tx/",
  7: "https://solana.fm/tx/",
  8: "https://explorer.aptoslabs.com/txn/",
};

export const chains = [...evmChainData, ...solanaChainData, ...aptosChainData]