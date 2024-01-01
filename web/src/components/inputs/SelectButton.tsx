import { ChevronDownIcon } from "@heroicons/react/16/solid"

function SelectButton({ imageUrl, value, onClick }: { imageUrl?: string, value: string, onClick: () => void }) {
    return (
        <div className='bg-gray-700 hover:bg-gray-600 rounded-full'>
            <button className='px-1 py-1' onClick={onClick}>
                <div className='flex justify-center space-x-1 items-center'>
                    {imageUrl ? <img className='h-6 w-6 mr-2 rounded-full' src={imageUrl} alt={value} /> : <div className="h-6 w-4 mr-2"></div>}
                    <p className='text-sm font-semibold uppercase'>{value}</p>
                    <ChevronDownIcon className='h-4 w-4' />
                </div>
            </button>
        </div>
    )
}

export default SelectButton