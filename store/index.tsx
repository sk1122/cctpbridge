import { create } from "zustand";

interface ITokenStore {
  sellToken: number;
  sellTokenBal: string;
  sellAmount: string;
  buyToken: number;
  buyAmount: string;
  receiverAddress: string;
  setSellToken: (tokenIndex: number) => void;
  setSellAmount: (amount: string) => void;
  setSellTokenBal: (bal: string) => void;
  setBuyToken: (tokenIndex: number) => void;
  setBuyAmount: (amount: string) => void;
  setReceiverAddress: (address: string) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
  sellToken: 0,
  sellTokenBal: "0",
  sellAmount: "",
  buyToken: 2,
  buyAmount: "",
  receiverAddress: "",
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
  setBuyAmount: (amount) =>
    set({
      buyAmount: amount,
    }),
  setReceiverAddress: (address) =>
    set({
      receiverAddress: address,
    }),
}));

export { useTokenStore };
