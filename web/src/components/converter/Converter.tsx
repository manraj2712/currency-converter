import { useState } from 'react';
import { Coin } from '../../types/coins';
import { SelectButton, SearchBar, InputBox, ConvertButton } from '../../components';

function Converter({ coinsAndCurrencies }: { coinsAndCurrencies: { coins: Coin[], currencies: string[] } }) {
    const [openCoinSearch, setOpenCoinSearch] = useState(false);
    const [openCurrencySearch, setOpenCurrencySearch] = useState(false);
    const [fromCoin, setFromCoin] = useState(coinsAndCurrencies.coins[0]);
    const [toCurrency, setToCurrency] = useState(coinsAndCurrencies.currencies[1]);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    return (
        <div className='flex justify-center mt-20 items-center'>
            <div className='bg-gray-800 rounded-md default-border w-full max-w-[600px] p-3 pt-5'>
                {/* Search Bars */}
                {
                    openCoinSearch && !openCurrencySearch && <SearchBar title="Select Token" placeholder='Search for a Token or Coin' values={coinsAndCurrencies.coins} onSelect={(coin: string) => {
                        setFromAmount(0);
                        setToAmount(0);
                        setFromCoin(coinsAndCurrencies.coins.filter((coinObj) => {
                            return coinObj.name === coin;
                        })[0]
                        );
                        setOpenCoinSearch(false);
                    }} onClose={() => { setOpenCoinSearch(false) }} />
                }
                {
                    openCurrencySearch && !openCoinSearch && <SearchBar title="Select Currency" placeholder='Search for a Currency' values={
                        coinsAndCurrencies.currencies.map((currency) => {
                            return {
                                name: currency,
                            }
                        })
                    } onSelect={(currency) => {
                        setFromAmount(0);
                        setToAmount(0);
                        setToCurrency(currency);
                        setOpenCurrencySearch(false);
                    }} onClose={() => { setOpenCurrencySearch(false) }} />
                }
                {/* Currency Selector*/}
                <div>
                    <div className='flex justify-between'>
                        <p className='form-field-heading'>From</p>
                        <p className='form-field-heading'>To</p>
                    </div>
                    <div className='bg-gray-900 py-2 px-2 mt-3'>
                        <div className='flex w-full rounded-md justify-between items-center'>
                            <SelectButton imageUrl={fromCoin.image} value={fromCoin.symbol} onClick={() => {
                                openCurrencySearch && setOpenCurrencySearch(!openCurrencySearch);
                                setOpenCoinSearch(!openCoinSearch);
                            }} />
                            {/* Vertical Divider */}
                            <div className='h-9 w-[1px] bg-gray-700 mr-6'></div>
                            <SelectButton
                                value={toCurrency}
                                onClick={() => {
                                    openCoinSearch && setOpenCoinSearch(!openCoinSearch);
                                    setOpenCurrencySearch(!openCurrencySearch);
                                }} />
                        </div>
                        {/* Currency Inputs */}
                        <div className='flex mt-5 space-x-2'>
                            <InputBox onAmountChange={(amount) => {
                                setFromAmount(amount);
                            }} amount={fromAmount} />
                            <InputBox onAmountChange={(amount) => {
                                setToAmount(amount);
                            }} isDisabled amount={toAmount} />
                        </div>
                    </div>
                </div>
                <ConvertButton fromAmount={fromAmount} fromCoin={fromCoin} toCurrency={toCurrency} onConvert={(e) => {
                    setToAmount(e);
                }} />
            </div>
        </div>
    )
}

export default Converter