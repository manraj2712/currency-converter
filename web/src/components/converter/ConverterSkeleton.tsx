import { ArrowsRightLeftIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

function ConverterSkeleton() {
    return (
        <div className='flex flex-col flex-grow justify-center h-full items-center px-1 py-4 overflow-auto'>
            <div className='bg-gray-800 rounded-xl default-border w-full max-w-[600px] p-3 pt-5'>
                <div className='animate-pulse'>
                    <div className='flex justify-between'>
                        <p className='form-field-heading'>From</p>
                        <p className='form-field-heading'>To</p>
                    </div>
                    <div className='bg-gray-900 py-2 px-3 mt-3 rounded-lg'>
                        <div className='flex w-full rounded-md my-4 justify-between items-center'>
                            <div className='bg-gray-700 rounded-full'>
                                <button className='p-2'>
                                    <div className='flex justify-center space-x-1 items-center'>
                                        <div className='h-6 w-6 rounded-full bg-gray-700'></div>
                                        <p className='text-sm'>BTC</p>
                                        <ChevronDownIcon className='h-4 w-4' />
                                    </div>
                                </button>
                            </div>
                            <ArrowsRightLeftIcon className='h-6 w-6 text-white hover:text-neutral-200 hover:cursor-pointer' />
                            <div className='bg-gray-700 rounded-full'>
                                <button className='p-2'>
                                    <div className='flex justify-center space-x-1 items-center'>
                                        <div className='h-6 w-6 rounded-full bg-gray-700'></div>
                                        <p className='text-sm'>USD</p>
                                        <ChevronDownIcon className='h-4 w-4' />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className='flex mt-10 mb-5 space-x-2'>
                            <div className='bg-gray-600 w-full p-2 py-5 outline-none'></div>
                            <div className='bg-gray-600 w-full p-2 py-5 outline-none'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConverterSkeleton