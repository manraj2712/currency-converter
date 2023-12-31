function InputBox({
    onAmountChange,
    isDisabled = false,
    amount = 0,
}: {
    onAmountChange: (amount: number) => void,
    isDisabled?: boolean,
    amount?: number,
}) {
    return (
        <input type="number" placeholder={isDisabled ? "" : "Enter a value"} value={amount == 0 ? undefined : amount} className={`bg-gray-800 w-full p-2 outline-none`} disabled={
            isDisabled
        } onChange={(e) => {
            onAmountChange(Number(e.target.value));
        }} />
    )
}

export default InputBox