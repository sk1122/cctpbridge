import useCosmos from "@/hooks/cosmos/useCosmos";

export default function ConnectCosmos() {
  const { connect } = useCosmos();

  return (
    <button
      className="bg-[#1F1F1F] text-white font-semibold rounded-xl w-full py-3 flex justify-center items-center gap-2"
      onClick={connect}
    >
      <img src="/asset/noble.jpg" alt="" className="w-6 h-6 rounded-full" />
      Cosmos
    </button>
  );
}
