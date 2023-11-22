const addTransaction = async (sender: string, receiver: string, srcChain: number, srcToken: string, srcTx: string, srcMessage: string, dstChain: number, dstToken: string, slippage: number) => {
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
                srcTx: srcTx,
                srcMessage: srcMessage,
                dstChain: dstChain,
                dstToken: dstToken,
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