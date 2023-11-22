import { MessageTransmitterABI } from "@/constants/abi/MessageTransmitter";
import useAttestation from "@/hooks/useAttestation";
import useSwitchChain from "@/hooks/useSwitchChain";
import getAllTransactions from "@/utils/getAllTransactions";
import getAttestation from "@/utils/getAttestation";
import updateTransaction from "@/utils/updateTransaction";
import { useEffect, useState } from "react";
import { keccak256 } from "viem";
import { useAccount, useContractWrite } from "wagmi";
import { Button } from "./button";
import Spinner from "./UI/Spinner";
import formatAddress from "@/utils/formatAddress";

interface ITransactions {
  id: string;
  createdAt: string;
  updatedAt: string;
  sender: `0x${string}`;
  receiver: `0x${string}`;
  srcChain: number;
  srcToken: string;
  srcTx: `0x${string}`;
  srcMessage: `0x${string}`;
  dstChain: number;
  dstToken: string;
  dstTx: string;
  slippage: number;
  pending: boolean;
}

export default function Transactions() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allTransactions, setAllTransactions] = useState<
    null | ITransactions[]
  >(null);
  const { attestationStatus } = useAttestation();
  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeAsync } = useContractWrite({
    abi: MessageTransmitterABI,
    functionName: "receiveMessage",
    address: "0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79",
  });

  async function claimTokens(
    dstChain: number,
    srcMessage: `0x${string}`,
    srcTx: `0x${string}`
  ) {
    try {
      setIsLoading(true);
      const isConfirmed = await attestationStatus(srcTx);

      if (isConfirmed) {
        const chainID = await switchChain(dstChain);
        if (!chainID) return;
        const response = await getAttestation(srcTx);
        const { hash } = await writeAsync({
          args: [srcMessage, response.attestation],
        });

        console.log(hash);
        await updateTransaction(srcTx, hash, false);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAllTransactions() {
    if (!address) return;
    const transactions = await getAllTransactions(address);
    console.log(transactions);
    if (transactions.length > 0) {
      setAllTransactions(transactions);
    }
  }

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            {allTransactions ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      View srcTx
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      View dstTx
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allTransactions?.map((tx) => (
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {tx.srcChain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {tx.dstChain}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {formatAddress(tx.srcTx)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        {tx.dstTx ? (
                          <>{formatAddress(tx.dstTx)}</>
                        ) : (
                          <Button
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            text="claim"
                            isLoading={false}
                            active={true}
                            onClick={() => {
                              claimTokens(tx.dstChain, tx.srcMessage, tx.srcTx);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center my-4">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
