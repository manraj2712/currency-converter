import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const allCurrencies = [
    {
        name: 'USDT',
        imageUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628'
    },
    {
        name: 'btc',
        imageUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
    },
    {
        name: 'eth',
        imageUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
    },
]

function SearchBar({ onSelect, onClose }: { onSelect: () => void, onClose: () => void }) {
    const [currencies, setCurrencies] = useState(allCurrencies.slice(0, 3));

    return (
        <div className='rounded-md mb-5'>
            <div className='bg-gray-900 mt-3 px-4 py-7 pb-10 rounded-md'>
                {/* Search Box */}
                <div className='flex justify-between'>
                    <p className='text-xl font-semibold'>Select Currency</p>
                    <XMarkIcon className='h-6 w-6 hover:cursor-pointer' onClick={onClose} />
                </div>
                <div className='flex space-x-1 mt-6 bg-gray-700 justify-center items-center rounded-md px-3 '>
                    <MagnifyingGlassIcon className='h-8 w-8 text-gray-500' />
                    <input type="text" className='w-full p-2 bg-transparent outline-none' placeholder='Search for a currency'
                        onChange={(e) => {
                            setCurrencies(allCurrencies.filter((currency) => {
                                return currency.name.toLowerCase().includes(e.target.value.toLowerCase());
                            }));
                        }}
                    />
                </div>

                {/* Currency List */}
                <div className='mt-5'>
                    {
                        currencies.map((currency) => {
                            return (
                                <div key={currency.name} className='flex items-center space-x-3 mt-3 hover:bg-gray-700 rounded-md p-2 hover:cursor-pointer' onClick={() => { }}>
                                    <img src={currency.imageUrl} alt={currency.name} className='h-8 w-8' />
                                    <p className='text-lg font-semibold uppercase'>{currency.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchBar