export const Input = ({
    placeholder,
    className
}: { placeholder: string, className?: string }) => {
    return (
        <input placeholder={placeholder} type="string" className={"w-full p-3 bg-black rounded-xl border-transparent focus:border-transparent focus:ring-0 focus:outline-none " + className} />
    )
}