import { isAddress } from 'viem';

export default function validateEvmaddress(address: string) {
    const isValid = isAddress(address);
    return isValid
}
