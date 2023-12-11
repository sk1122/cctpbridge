import { chains } from "@/lib/data";

export default function getChainName(chainID: number) {
    const chain = chains.find((chain) => chain.testnetChainId == chainID);
    return chain?.name
}
