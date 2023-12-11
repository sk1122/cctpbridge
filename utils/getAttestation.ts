const getAttestation = async (messageHash: string) => {
  try {
    const _response = await fetch(
      `https://iris-api.circle.com/attestations/${messageHash}`
    );
    const response = await _response.json();
    console.log("Attestation response: ", response);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getAttestation;
