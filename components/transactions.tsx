import getAllTransactions from "@/utils/getAllTransactions";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import SingleTransaction from "./SingleTransaction";
import Spinner from "./UI/Spinner";

export interface ITransactions {
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
  const { address } = useAccount();

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
                      Source
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-white uppercase"
                    >
                      Destination
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
              <div className="flex justify-center my-4 w-full sm:w-[462px]">
                {transactionLoading ? (
                  <div className="w-10 h-10">
                    <Spinner />
                  </div>
                ) : (
                  <h1>No data found</h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
