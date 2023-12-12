const updateTransaction = async (srcTx: string, dstTx: string, pending: boolean) => {
    // console.log(srcTx, dstTx, "utils")
    try {
        const res = await fetch("/api/updateTransaction", {
            method: "PUT",
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
        // console.log(error)
    }
}

export default updateTransaction