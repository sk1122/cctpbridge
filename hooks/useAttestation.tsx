import { useTokenStore } from "@/store";
import getAttestation from "@/utils/getAttestation";
import sleep from "@/utils/sleep";

export default function useAttestation() {
  const { sellToken } = useTokenStore();

  async function waitForConfirmation() {
    if (sellToken === 0) {
      await sleep(72000);
    } else {
      await sleep(40000);
    }
  }

  async function attestationStatus(messagehash: string) {
    try {
      await waitForConfirmation();
      const response = await getAttestation(messagehash);
      if (response.status === "complete") {
        return true;
      } else {
        await attestationStatus(messagehash);
      }
    } catch (error) {
      console.log(error);
    }

    // if (response.status === "complete") {
    //   console.log("Status = complete");
    //   return true;
    // } else {
    //   console.log("Status = pending");
    //   while (response.status === "pending_confirmations") {
    //     try {
    //       const response = await getAttestation(messagehash);
    //       if (response.status === "complete") {
    //         console.log("Status = complete");
    //         return true;
    //       } else {
    //         await sleep(5000);
    //         continue;
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // }
  }

  return { attestationStatus };
}
