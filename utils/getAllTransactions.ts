const getAllTransactions = async (address: string) => {
    try {
        const res = await fetch(`/api/getAllTransactions?address=${address}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json ",
            },
        });
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}

export default getAllTransactions