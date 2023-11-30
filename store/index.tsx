import { create } from "zustand";

interface ITokenStore {
  sellToken: number;
  sellTokenBal: string;
  sellAmount: string;
  buyToken: number;
  buyTokenBal: string;
  buyAmount: string;
  srcTx: undefined | string;
  setSellToken: (tokenIndex: number) => void;
  setSellAmount: (amount: string) => void;
  setSellTokenBal: (bal: string) => void;
  setBuyToken: (tokenIndex: number) => void;
  setBuyAmount: (amount: string) => void;
  setBuyTokenBal: (bal: string) => void;
  setSrcTx: (srcTx: string | undefined) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
  sellToken: 0,
  sellTokenBal: "0",
  sellAmount: "",
  buyToken: 2,
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
      buyTokenBal: bal,
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
