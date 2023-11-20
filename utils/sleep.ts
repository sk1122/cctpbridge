export default function sleep(ms: number) {
    return new Promise((resolveFunc) => setTimeout(resolveFunc, ms));
}
