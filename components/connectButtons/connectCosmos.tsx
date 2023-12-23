import useConnectCosmos from "@/hooks/cosmos/useConnectCosmos";

export default function ConnectCosmos() {
  const { connect } = useConnectCosmos();

  return (
    <button
      className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3"
      onClick={connect}
    >
      Cosmos
    </button>
  );
}
