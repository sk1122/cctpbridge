import useCosmos from "@/hooks/cosmos/useCosmos";
import { useCosmosStore } from "@/store/cosmos";

export default function ConnectCosmos() {
  const { address, setAddress } = useCosmosStore();
  const { connect, disconnect } = useCosmos();

  return (
    <>
      {address ? (
        <button
          className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3 flex justify-center items-center gap-2"
          onClick={disconnect}
        >
          <img src="/asset/noble.jpg" alt="" className="w-6 h-6 rounded-full" />
          Disconnect
        </button>
      ) : (
        <button
          className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3 flex justify-center items-center gap-2"
          onClick={connect}
        >
          <img src="/asset/noble.jpg" alt="" className="w-6 h-6 rounded-full" />
          Cosmos
        </button>
      )}
    </>
  );
}
