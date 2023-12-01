import { create } from "zustand";

interface ITokenStore {
  sellToken: number;
  sellAmount: string;
  buyToken: number;
  receiverAddress: string;
  isReceiverAddress: boolean;
  balance: null | string;
  claimChainId: number;
  setSellToken: (tokenIndex: number) => void;
  setSellAmount: (amount: string) => void;
  setBuyToken: (tokenIndex: number) => void;
  setReceiverAddress: (address: string) => void;
  setIsReceiverAddress: (isReceiverAddress: boolean) => void;
  setBalance: (balance: string) => void;
  setClaimChainId: (chainId: number) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
  sellToken: 0,
  sellAmount: "",
  buyToken: 2,
  receiverAddress: "",
  isReceiverAddress: false,
  balance: null,
  claimChainId: 0,
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
  setReceiverAddress: (address) =>
    set({
      receiverAddress: address,
    }),
  setIsReceiverAddress: (isReceiverAddress) =>
    set({
      isReceiverAddress: isReceiverAddress,
    }),
  setBalance: (balance) =>
    set({
      balance: balance,
    }),
  setClaimChainId: (chainId) =>
    set({
      claimChainId: chainId,
    }),
}));

export { useTokenStore };
