import { create } from "zustand";

interface ITokenStore {
  sellToken: undefined | string;
  sellAmount: string;
  buyToken: undefined | string;
  buyAmount: string;
  srcTx: undefined | string;
  setSellToken: (tokenIndex: string | undefined) => void;
  setSellAmount: (amount: string) => void;
  setBuyToken: (tokenIndex: string | undefined) => void;
  setBuyAmount: (amount: string) => void;
  setSrcTx: (srcTx: string | undefined) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
  sellToken: undefined,
  sellAmount: "",
  buyToken: undefined,
  buyAmount: "",
  srcTx: undefined,
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
  setSrcTx: (srcTx) =>
    set({
      srcTx: srcTx,
    }),
}));

export { useTokenStore };
