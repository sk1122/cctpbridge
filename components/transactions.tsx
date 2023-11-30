import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import useAttestation from "@/hooks/useAttestation";
import useSwitchChain from "@/hooks/useSwitchChain";
import formatAddress from "@/utils/formatAddress";
import getAllTransactions from "@/utils/getAllTransactions";
import getAttestation from "@/utils/getAttestation";
import updateTransaction from "@/utils/updateTransaction";
import { useEffect, useState } from "react";
import { useAccount, useChainId, useContractWrite } from "wagmi";
import Spinner from "./UI/Spinner";
import { Button } from "./button";
import getChainName from "@/utils/getChainName";
import { keccak256 } from "viem";
import { chains } from "@/lib/data";
import useRelease from "@/hooks/useRelease";

interface ITransactions {
  id: string;
  createdAt: string;
  updatedAt: string;
  sender: `0x${string}`;
  receiver: `0x${string}`;
  srcChain: number;
  srcToken: string;
  srcAmount: string;
  srcTx: `0x${string}`;
  srcMessage: `0x${string}`;
  dstChain: number;
  dstToken: string;
  dstAmount: string;
  dstTx: string | null;
  slippage: number;
  pending: boolean;
}

export default function Transactions() {
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [allTransactions, setAllTransactions] = useState<
    null | ITransactions[] | []
  >(null);
  const { attestationStatus } = useAttestation();
  const { address } = useAccount();
  const chainID = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeAsync } = useContractWrite({
    abi: MessageTransmitterABI,
    functionName: "receiveMessage",
    address: "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79",
  });

  async function fetchAllTransactions() {
    try {
      setTransactionLoading(true);
      const transactions = await getAllTransactions(address!);
      console.log(transactions);
      if (transactions.length > 0) {
        setAllTransactions(transactions);
      }
      if (transactions.length === 0) {
        setAllTransactions([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTransactionLoading(false);
    }
  }

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  function SingleTransaction({
    tx,
    isLastTransaction,
  }: {
    tx: ITransactions;
    isLastTransaction: boolean;
  }) {
    const { releaseFunds } = useRelease();
    const [dstTx, setDstTx] = useState<string | null>(tx.dstTx);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function claimTokens(
      dstChain: number,
      srcMessage: `0x${string}`,
      srcTx: `0x${string}`
    ) {
      try {
        if (isLoading) return;
        setIsLoading(true);
        const messagehash = keccak256(srcMessage);
        const isConfirmed = await attestationStatus(messagehash);

        console.log(srcTx, dstChain, srcMessage);

        if (isConfirmed) {
          console.log("herewww");
          const chain = chains.find((chain) => chain.chainId == dstChain);
          if (chain?.testnetChainId && chainID !== chain?.testnetChainId) {
            await switchChain(chain?.testnetChainId);
          }
          console.log("here");
          const response = await getAttestation(messagehash);
          const hash = await releaseFunds(srcMessage, response.attestation);
          if (!hash) return;
          console.log(hash);
          setDstTx(hash);
          await updateTransaction(srcTx, hash, false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

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
        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
          {formatAddress(tx.srcTx)}
        </td>
        <td
          className={`px-6 py-4 whitespace-nowrap text-end text-sm font-medium text-white ${
            isLastTransaction ? `rounded-br-lg` : undefined
          }`}
        >
          {dstTx ? (
            <>{formatAddress(dstTx)}</>
          ) : (
            <Button
              className="inline-flex items-center gap-x-2 text-sm px-4 py-1 font-semibold rounded-full bg-[#FF7D1F] text-white"
              text="claim"
              isLoading={isLoading}
              active={true}
              onClick={() => {
                claimTokens(tx.dstChain, tx.srcMessage, tx.srcTx);
              }}
            />
          )}
        </td>
      </tr>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            {!transactionLoading &&
            allTransactions &&
            allTransactions?.length > 0 ? (
              <table className="min-w-full">
                <thead className="bg-[#070708]">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                    >
                      Sent Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                    >
                      Received Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-white uppercase"
                    >
                      View srcTx
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-white uppercase"
                    >
                      View dstTx
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-[#17181C]">
                  {allTransactions?.map((tx, index) => (
                    <SingleTransaction
                      tx={tx}
                      isLastTransaction={allTransactions?.length - 1 === index}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center my-4">
                {transactionLoading ? <Spinner /> : <h1>No data found</h1>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
