import getChainName from "@/utils/getChainName";
import { ITransactions } from "./transactions";
import formatAddress from "@/utils/formatAddress";
import LinkIcon from "./UI/Icons/LinkIcon";
import Timer from "./UI/Timer";
import React from "react";
import getExplorerLink from "@/utils/getExplorerLink";

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
        <p>{getChainName(tx.srcChain)}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        <p>{getChainName(tx.dstChain)}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
        <p>{tx.srcAmount}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        <p>{tx.dstAmount}</p>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        <a
          href={getExplorerLink(tx.srcChain, tx.srcTx)}
          target="_blank"
          className="flex items-center gap-1"
        >
          <p>{formatAddress(tx.srcTx)}</p>
          <LinkIcon />
        </a>
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
