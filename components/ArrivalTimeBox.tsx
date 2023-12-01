import React from "react";
import { Info, Clock } from "lucide-react";
import useArrivalTime from "@/hooks/useArrivalTime";

export default function ArrivalTimeBox() {
  const { arrivalTime } = useArrivalTime();

  return (
    <div className="bg-[#17181C] text-[#7A7A7A] flex justify-between items-center rounded-xl px-4 py-2 border border-[#464646]">
      <div className="flex items-center gap-2">
        <p className="font-medium">Estimated arrival time</p>
        <Info className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <p className="font-medium">~{arrivalTime}</p>
      </div>
    </div>
  );
}
