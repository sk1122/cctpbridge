import { ChainSelect } from "./chain-select"
import { Input } from "./input"

export const ChainAmountInput = ({ text }: { text: string }) => {
    return (
        <div className="flex px-3 py-2 bg-[#1b1b1b] rounded-xl justify-center items-center w-full h-full">
            <div className="w-full h-full flex flex-col justify-center items-start">
                <p className="text-xs px-3 text-gray-500">{text}</p>
                <Input placeholder="0" className="bg-transparent text-xl" />
            </div>
            <div className="w-full h-full flex flex-col justify-center items-end space-y-1">
                <ChainSelect />
                <p className="text-xs text-gray-500">Balance: 0</p>
            </div>
        </div>
    )
}