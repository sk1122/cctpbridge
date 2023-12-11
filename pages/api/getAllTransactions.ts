import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const address = req.query.address

            const transactions = await prisma.transaction.findMany({
                where: {
                    sender: address,
                    testnet: true
                },
            });

            res.status(200).json(transactions);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    } else {
        res.status(200).json({ message: "Method not allowed" });
    }
}