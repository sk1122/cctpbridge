import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

export default function Slippage() {
  const [slippage, setSlippage] = useState<number>(1);

  return (
    <div>
      <Input
        className="bg-gray-200 text-lg rounded-md"
        type="number"
        placeholder="Enter slippage"
        value={slippage}
        onChange={(e) => {
          setSlippage(parseInt(e.target.value));
        }}
      />
      <div className="mt-4">
        <Button active={true} text="Submit" isLoading={false} />
      </div>
    </div>
  );
}
