import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        try {
            const { srcTx, dstTx, pending } = req.body;

            console.log(srcTx, dstTx, "api")

            const updatedAt = new Date(Date.now()).toISOString();

            const project = await prisma.transaction.update({
                where: {
                    srcTx: srcTx,
                },
                data: {
                    updatedAt,
                    dstTx,
                    pending
                },
            });

            console.log(project)
            res.status(200).json(project);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    } else {
        res.status(200).json({ message: "Method not allowed" });
    }
}