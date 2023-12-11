import { explorerLinks } from "@/constants/explorerLinks";
import { chains } from "@/lib/data";

export default function getExplorerLink(chainID: number, tx: `0x${string}`) {
    const index = chains.findIndex((chain) => chain.chainId === chainID)
    const explorerLink = `${explorerLinks[index]}/${tx}`
    return explorerLink
}
