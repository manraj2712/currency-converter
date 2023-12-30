import { ArrowsRightLeftIcon } from '@heroicons/react/16/solid'
import CurrencyButton from './CurrencyButton';
import InputBox from './InputBox';
import CtaButton from './CtaButton';
import { useState } from 'react';
import SearchBar from './SearchBar';
function Converter() {
    const [openSearch, setOpenSearch] = useState(false);
    return (
        <div className='flex justify-center mt-20'>
            <div className='bg-gray-800 rounded-md default-border w-full max-w-[600px] p-3 pt-5'>
                {/* Search Bar */}
                {
                    openSearch && <div className='mt-3'>
                        <SearchBar onSelect={() => { }} onClose={() => {
                            setOpenSearch(false);
                        }} />
                    </div>
                }
                {/* Currency conversion*/}
                <div>
                    <div className='flex justify-between'>
                        <p className='form-field-heading'>From</p>
                        <p className='form-field-heading'>To</p>
                    </div>
                    <div className='bg-gray-900 py-2 px-2 mt-3'>
                        <div className='flex w-full rounded-md justify-between items-center'>
                            <CurrencyButton imageUrl='https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628' currency='USD' onClick={() => {
                                setOpenSearch(!openSearch);
                                console.log(openSearch);
                            }} />
                            <ArrowsRightLeftIcon className='h-6 w-6 text-white hover:text-neutral-200 hover:cursor-pointer' />
                            <CurrencyButton imageUrl='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579' currency='BTC' onClick={() => {
                                setOpenSearch(!openSearch);
                                console.log(openSearch);
                            }} />
                        </div>
                        <div className='flex mt-5 space-x-2'>
                            <InputBox onAmountChange={() => { }} />
                            <InputBox onAmountChange={() => { }} isDisabled />
                        </div>
                    </div>
                </div>
                <div className='mt-24'>
                    <CtaButton text={`Convert ${"USDT"} to ${"ETH"}`} />
                </div>
            </div>
        </div>
    )
}

export default Converter