export default function getTimeDifference(time: string) {
    const currentTime = new Date();
    const txTime = new Date(time);

    //@ts-ignore
    const minutes = (currentTime - txTime) / (1000 * 60)

    const seconds = Math.floor(minutes * 60)

    return seconds
}