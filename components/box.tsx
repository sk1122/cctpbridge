import { BoxHeader } from "./box-headers"
import { Button } from "./button"
import { ChainAmountInput } from "./chain-amount-input"

export const Box = () => {
    return (
        <div className="shadow-2xl shadow-cyan-500 w-[462px] bg-black rounded-xl h-full flex flex-col px-3 pb-3 justify-center items-center space-y-3">
            <BoxHeader />
            <div className="w-full h-full space-y-2">
                <ChainAmountInput text="You Pay" />
                <ChainAmountInput text="You Get" />
            </div>
            <Button text="Bridge" active={true} />
        </div>
    )
}