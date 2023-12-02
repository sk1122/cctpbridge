import useTimer from "@/hooks/useTimer";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { ITransactions } from "../transactions";
import formatAddress from "@/utils/formatAddress";
import LinkIcon from "./Icons/LinkIcon";
import { Button } from "../button";
import useRelease from "@/hooks/useRelease";
import { keccak256 } from "viem";
import useAttestation from "@/hooks/useAttestation";
import { chains } from "@/lib/data";
import useSwitchChain from "@/hooks/useSwitchChain";
import { useChainId } from "wagmi";
import getAttestation from "@/utils/getAttestation";
import updateTransaction from "@/utils/updateTransaction";
import { useTokenStore } from "@/store";

export default function Timer({ tx }: { tx: ITransactions }) {
  const { handleTimer, seconds } = useTimer();
  const { releaseFunds } = useRelease();
  const [dstTx, setDstTx] = useState<string | null>(tx.dstTx);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { attestationStatus } = useAttestation();
  const { switchChain } = useSwitchChain();
  const chainID = useChainId();
  const { setClaimChainId } = useTokenStore();

  useEffect(() => {
    handleTimer(tx.srcChain, tx.createdAt);
  }, []);

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
        const chain = chains.find((chain) => chain.chainId == dstChain);
        if (chain?.testnetChainId && chainID !== chain?.testnetChainId) {
          await switchChain(chain?.testnetChainId);
        }
        if (!chain) return;
        console.log("here", chain);
        setClaimChainId(chain.id - 1);
        const response = await getAttestation(messagehash);
        const hash = await releaseFunds(
          srcMessage,
          response.attestation,
          chain.id - 1
        );
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
    <>
      {seconds ? (
        <div className="inline-flex items-center gap-x-2 px-4 py-1 rounded-full bg-[#FF7D1F] text-white">
          <p className="text-sm font-semibold">{seconds}</p>
          <div className="w-5 h-5">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          {dstTx ? (
            <div className="flex items-center gap-1">
              {formatAddress(dstTx)}
              <LinkIcon />
            </div>
          ) : (
            <Button
              className="inline-flex items-center gap-x-2 text-sm px-4 py-1 font-semibold rounded-full bg-[#FF7D1F] text-white"
              text="Claim"
              isLoading={isLoading}
              active={true}
              onClick={() => {
                claimTokens(tx.dstChain, tx.srcMessage, tx.srcTx);
              }}
            />
          )}
        </>
      )}
    </>
  );
}
