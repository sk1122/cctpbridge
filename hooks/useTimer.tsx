import { chains } from "@/lib/data";
import formatTime from "@/utils/formatTime";
import getTimeDifference from "@/utils/getTimeDifference";
import { useState } from "react";

const confirmationTimes = [
  {
    id: 0,
    network: "ethereum",
    testnet: 60,
    mainnet: 780,
  },
  {
    id: 1,
    network: "polygon",
    testnet: 0,
    mainnet: 0,
  },
  {
    id: 2,
    network: "avalanche",
    testnet: 20,
    mainnet: 20,
  },
  {
    id: 3,
    network: "arbitrum",
    testnet: 20,
    mainnet: 780,
  },
  {
    id: 4,
    network: "optimism",
    testnet: 20,
    mainnet: 780,
  },
];

export default function useTimer() {
  const [seconds, setSeconds] = useState<string | null>(null);

  function timer(sec: number) {
    if (sec <= 0) {
      setSeconds(null);
      return;
    }
    setSeconds(formatTime(sec));

    return setTimeout(() => {
      timer(--sec);
    }, 1000);
  }

  function handleTimer(chainID: number, transactionTime: string) {
    const chain = chains.find((chain) => chain.chainId == chainID);
    if (!chain) return;

    const diff = getTimeDifference(transactionTime);

    if (diff <= 0) return;

    if (confirmationTimes[chain?.id - 1].testnet > diff) {
      const seconds = confirmationTimes[chain?.id - 1].testnet - diff;
      timer(seconds);
    }
  }

  return { seconds, handleTimer };
}
