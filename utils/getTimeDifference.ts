export default function getTimeDifference(time: string) {
    const currentTime = new Date();
    const txTime = new Date(time);

    //@ts-ignore
    const minutes = Math.floor((currentTime - txTime) / (1000 * 60))

    console.log(minutes)

    const seconds = minutes * 60

    return seconds
}