const addTransaction = async (sender: string, receiver: string, srcChain: number | string, srcToken: string, srcAmount: string, srcTx: string, srcMessage: string, dstChain: number | string, dstToken: string, dstAmount: string, slippage: number) => {
    try {
        const res = await fetch("/api/addTransaction", {
            method: "POST",
            headers: {
                "Content-type": "application/json ",
            },
            body: JSON.stringify({
                sender: sender,
                receiver: receiver,
                srcChain: srcChain,
                srcToken: srcToken,
                srcAmount: srcAmount,
                srcTx: srcTx,
                srcMessage: srcMessage,
                dstChain: dstChain,
                dstToken: dstToken,
                dstAmount: dstAmount,
                slippage: slippage
            }),
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export default addTransaction