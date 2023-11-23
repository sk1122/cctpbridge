import React from "react";

export default function Hero() {
  return (
    <div className="w-full min-h-[calc(100vh-92px)] flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold text-white text-7xl">CCTP Bridge</h1>
        <h3 className="text-[#CFCFCF] font-semibold text-4xl max-w-4xl mt-12">
          Trustless Cross chain bridges powered by CCTP, a Public good by Fetcch
        </h3>
        <button className="px-10 py-3 border-2 border-white text-white bg-[#FF7D1F] rounded-full font-bold mt-10">
          Interact
        </button>
      </div>
    </div>
  );
}