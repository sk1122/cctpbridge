export const Button = ({ text, active }: { text: string, active: boolean }) => {
    return (
        <div className={(!active ? "bg-[#1b1b1b] " : "bg-[#FDAE40] text-black ") + "w-full h-full flex justify-center items-center p-4 rounded-xl cursor-pointer"}>
            {text}
        </div>
    )
}