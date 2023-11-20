import getAttestation from "@/utils/getAttestation";
import sleep from "@/utils/sleep";

export default function useAttestation() {
  async function attestationStatus(messagehash: string) {
    const response = await getAttestation(messagehash);
    console.log(response);
    if (response.status === "complete") {
      console.log("Status = complete");
      return true;
    } else {
      console.log("Status = pending");
      while (response.status === "pending_confirmations") {
        try {
          const response = await getAttestation(messagehash);
          if (response.status === "complete") {
            console.log("Status = complete");
            return true;
          } else {
            await sleep(5000);
            continue;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  return { attestationStatus };
}
