import { create } from "zustand";

interface ICosmosStore {
  address: string | undefined;
  setAddress: (address: string | undefined) => void;
}

const useCosmosStore = create<ICosmosStore>((set) => ({
  address: undefined,
  setAddress: (address) =>
    set({
      address: address,
    }),
}));

export { useCosmosStore };
