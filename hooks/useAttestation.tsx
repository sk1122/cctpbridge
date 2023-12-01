import getAttestation from "@/utils/getAttestation";

export default function useAttestation() {
  async function attestationStatus(messagehash: string) {
    try {
      const response = await getAttestation(messagehash);
      if (response.status === "complete") {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  return { attestationStatus };
}
