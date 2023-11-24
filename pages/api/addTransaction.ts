import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { sender, receiver, srcChain, srcToken, srcAmount, srcTx, srcMessage, dstChain, dstToken, dstAmount, slippage } = req.body;

      const updatedAt = new Date(Date.now()).toISOString();

      const project = await prisma.transaction.create({
        data: {
          updatedAt,
          sender,
          receiver,
          srcChain,
          srcToken,
          srcAmount,
          srcTx,
          srcMessage,
          dstChain,
          dstToken,
          dstAmount,
          slippage,
        },
      });
      res.status(200).json(project);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(200).json({ message: "Method not allowed" });
  }
}