import { create } from "zustand";

interface ITokenStore {
  sellToken: undefined | string;
  sellAmount: number;
  buyToken: undefined | string;
  buyAmount: number;
  setSellToken: (tokenIndex: string | undefined) => void;
  setSellAmount: (amount: number) => void;
  setBuyToken: (tokenIndex: string | undefined) => void;
  setBuyAmount: (amount: number) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
  sellToken: undefined,
  sellAmount: 0,
  buyToken: undefined,
  buyAmount: 0,
  setSellToken: (tokenIndex) =>
    set({
      sellToken: tokenIndex,
    }),
  setSellAmount: (amount) =>
    set({
      sellAmount: amount,
    }),
  setBuyToken: (tokenIndex) =>
    set({
      buyToken: tokenIndex,
    }),
  setBuyAmount: (amount) =>
    set({
      buyAmount: amount,
    }),
}));

export { useTokenStore };
