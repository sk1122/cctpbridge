import { useRouter } from "next/router";
import React from "react";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="w-full min-h-[calc(100vh-92px)] flex justify-center items-center px-4">
      <div className="text-center">
        <h1 className="font-bold text-white text-5xl lg:text-7xl">
          CCTP Bridge
        </h1>
        <h3 className="text-[#CFCFCF] font-semibold text-2xl lg:text-4xl max-w-4xl mt-12">
          Trustless Cross chain bridges powered by CCTP, a Public good by Fetcch
        </h3>
        <button
          className="px-10 py-3 border-2 border-white text-white bg-[#FF7D1F] rounded-full font-bold mt-10"
          onClick={() => router.push("/bridge")}
        >
          Interact
        </button>
      </div>
    </div>
  );
}
