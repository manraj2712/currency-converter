function InputBox({
    onAmountChange,
    isDisabled = false,
    amount = 0,
    placeholder = "Enter a value",
}: {
    onAmountChange: (amount: number) => void,
    isDisabled?: boolean,
    amount?: number,
    placeholder?: string
}) {
    return (
        <input type="number" placeholder={isDisabled ? "" : placeholder} value={amount == 0 ? '' : amount} className={`bg-gray-800 w-full p-2 outline-none`} disabled={
            isDisabled
        } onChange={(e) => {
            onAmountChange(Number(e.target.value));
        }} />
    )
}

export default InputBox