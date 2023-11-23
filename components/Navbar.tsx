import React from "react";
import { Button } from "./button";

export default function Navbar() {
  return (
    <div className="container mx-auto py-5 flex justify-between items-center">
      <img src="/logo.svg" alt="" />
      <button className="bg-transparent px-10 py-3 border-2 border-[#FF7D1F] rounded-full font-bold">
        Interact
      </button>
    </div>
  );
}
