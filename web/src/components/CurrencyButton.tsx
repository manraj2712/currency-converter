import { ChevronDownIcon } from "@heroicons/react/16/solid"

function CurrencyButton({ imageUrl, currency, onClick }: { imageUrl: string, currency: string, onClick: () => void }) {
    return (
        <div className='bg-gray-500 hover:bg-neutral-300 rounded-xl'>
            <button className='p-2' onClick={onClick}>
                <div className='flex justify-center space-x-1 items-center'>
                    <img className='h-6 w-6 rounded-full' src={imageUrl} alt={currency} />
                    <p className='text-sm'>{currency}</p>
                    <ChevronDownIcon className='h-4 w-4' />
                </div>
            </button>
        </div>
    )
}

export default CurrencyButton