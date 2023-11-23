import React from "react";
import { Input } from "./input";
import { Button } from "./button";

export default function Feedback() {
  return (
    <div className="bg-[#17181C] rounded-lg px-6 py-8">
      <p className="uppercase text-[#FF7D1F] font-medium text-xs">Feedback</p>
      <div className="mt-5">
        <h1 className="text-3xl text-gray-500">
          Seeking personalized support?
        </h1>
        <h1 className="text-3xl text-white">Request a call from our team</h1>
      </div>
      <div className="mt-6">
        <Input className={"border border-white"} placeholder="Your Name" />
        <Input
          className={"border border-white mt-4"}
          placeholder="Phone Number"
        />
      </div>
      <button className="px-8 py-2 rounded-full text-white bg-[#FF7D1F] mt-6">
        Send Request
      </button>
    </div>
  );
}
