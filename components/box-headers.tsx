import { Cog } from "lucide-react"

export const BoxHeader = () => {
    return (
        <div className="p-5 w-full h-full flex justify-between items-center">
            <div className="w-full h-full flex justify-start items-center space-x-4">
                <h1>Swap</h1>
            </div>
            <div className="w-full h-full flex justify-end items-center space-x-4">
                <Cog />
            </div>
        </div>
    )
}