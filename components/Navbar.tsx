import { useRouter } from "next/router";
import { CustomConnectButton } from "./custom-connect-button";

export default function Navbar() {
  const router = useRouter();

  const isHomePage = router.asPath === "/";

  return (
    <div className="container mx-auto py-5 flex justify-between items-center px-4">
      <img
        className="cursor-pointer"
        src="/logo.svg"
        alt=""
        onClick={() => {
          router.push("/");
        }}
      />
      {isHomePage ? (
        <button
          className="bg-transparent px-10 py-3 border-2 border-[#FF7D1F] rounded-full font-bold"
          onClick={() => router.push("/bridge")}
        >
          Interact
        </button>
      ) : (
        <div>
          <CustomConnectButton />
        </div>
      )}
    </div>
  );
}
