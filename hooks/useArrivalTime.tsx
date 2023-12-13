import { useTokenStore } from "@/store";
import React, { useEffect, useState } from "react";

export default function useArrivalTime() {
  const { sellToken } = useTokenStore();
  const [arrivalTime, setArrivalTime] = useState<string>("13:00");

  function handleArrivalTime() {
    console.log("SELL TOKEN: ", sellToken)
    switch (sellToken) {
      case 1:
        setArrivalTime("08:00");
        break;
      case 2:
        setArrivalTime("00:20");
        break;
      case 3:
        setArrivalTime("13:00");
        break;
      case 4:
        setArrivalTime("13:00");
        break;
      default:
        setArrivalTime("13:00");
        break;
    }
  }

  useEffect(() => {
    handleArrivalTime();
  }, [sellToken]);

  return { arrivalTime };
}
