import { create } from "zustand";

interface ITokenStore {
  sellToken: undefined | string;
  sellTokenBal: string;
  sellAmount: string;
  buyToken: undefined | string;
  buyTokenBal: string;
  buyAmount: string;
  srcTx: undefined | string;
  setSellToken: (tokenIndex: string | undefined) => void;
  setSellAmount: (amount: string) => void;
  setSellTokenBal: (bal: string) => void;
  setBuyToken: (tokenIndex: string | undefined) => void;
  setBuyAmount: (amount: string) => void;
  setBuyTokenBal: (bal: string) => void;
  setSrcTx: (srcTx: string | undefined) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
  sellToken: undefined,
  sellTokenBal: "0",
  sellAmount: "",
  buyToken: undefined,
  buyTokenBal: "0",
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
  setSellTokenBal: (bal) =>
    set({
      sellTokenBal: bal,
    }),
  setBuyToken: (tokenIndex) =>
    set({
      buyToken: tokenIndex,
    }),
  setBuyTokenBal: (bal) =>
    set({
      buyToken: bal,
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
