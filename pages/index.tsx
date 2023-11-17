import Image from "next/image";
import { Inter } from "next/font/google";
import { Box } from "@/components/box";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center bg-white p-24 space-y-10 ${inter.className}`}
    >
      <div className="text-black relative space-y-1">
        <h1 className="font-bold text-5xl">CCTP Bridge</h1>
        <p className="text-sm flex space-x-3">
          <span>Powered by</span>{" "}
          <img src="https://fetcch.xyz/logo.svg" className="w-12" />
        </p>
      </div>
      <Box />
    </main>
  );
}
