const updateTransaction = async (srcTx: string, dstTx: string, pending: boolean) => {
    try {
        const res = await fetch("/api/updateTransaction", {
            method: "POST",
            headers: {
                "Content-type": "application/json ",
            },
            body: JSON.stringify({
                srcTx: srcTx,
                dstTx: dstTx,
                pending: pending
            }),
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export default updateTransaction