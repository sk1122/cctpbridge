import getChainName from "@/utils/getChainName";
import { ITransactions } from "./transactions";
import formatAddress from "@/utils/formatAddress";
import LinkIcon from "./UI/Icons/LinkIcon";
import Timer from "./UI/Timer";
import React from "react";

function SingleTransaction({
  tx,
  isLastTransaction,
}: {
  tx: ITransactions;
  isLastTransaction: boolean;
}) {
  return (
    <tr>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-white ${
          isLastTransaction ? `rounded-bl-lg` : undefined
        }`}
      >
        {getChainName(tx.srcChain)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        {getChainName(tx.dstChain)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
        {tx.srcAmount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        {tx.dstAmount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white flex items-center gap-1">
        {formatAddress(tx.srcTx)} 
        <LinkIcon />
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-end text-sm font-medium text-white ${
          isLastTransaction ? `rounded-br-lg` : undefined
        }`}
      >
        <Timer tx={tx} />
      </td>
    </tr>
  );
}

export default React.memo(SingleTransaction);
