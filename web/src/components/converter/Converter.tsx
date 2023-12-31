import { useState } from 'react';
import { Coin } from '../../types/coins';
import { SelectButton, SearchBar, ConvertButton } from '../../components';

function Converter({ coinsAndCurrencies: { coins, currencies } }: { coinsAndCurrencies: { coins: Coin[], currencies: string[] } }) {
    const [openCoinSearch, setOpenCoinSearch] = useState(false);
    const [openCurrencySearch, setOpenCurrencySearch] = useState(false);
    const [fromCoin, setFromCoin] = useState(coins[0]);
    const [toCurrency, setToCurrency] = useState(currencies[1]);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);

    const handleCoinSelection = (coin: string) => {
        setToAmount(0);
        setFromCoin(coins.find((coinObj) => coinObj.name === coin) || coins[0]);
        setOpenCoinSearch(false);
    };

    const handleCurrencySelection = (currency: string) => {
        setToAmount(0);
        setToCurrency(currency);
        setOpenCurrencySearch(false);
    };

    return (
        <div className='flex justify-center mt-20 items-center'>
            <div className='bg-gray-800 rounded-md default-border w-full max-w-[600px] p-3 pt-5'>
                {openCoinSearch && !openCurrencySearch && (
                    <SearchBar
                        title='Select Token'
                        placeholder='Search for a Token or Coin'
                        values={coins}
                        onSelect={handleCoinSelection}
                        onClose={() => setOpenCoinSearch(false)}
                    />
                )}
                {openCurrencySearch && !openCoinSearch && (
                    <SearchBar
                        title='Select Currency'
                        placeholder='Search for a Currency'
                        values={currencies.map((currency) => ({ name: currency }))}
                        onSelect={handleCurrencySelection}
                        onClose={() => setOpenCurrencySearch(false)}
                    />
                )}
                <div>
                    <div className='flex justify-between'>
                        <p className='form-field-heading'>From</p>
                        <p className='form-field-heading'>To</p>
                    </div>
                    <div className='bg-gray-900 py-2 px-2 mt-3'>
                        <div className='flex w-full rounded-md justify-between items-center'>
                            <SelectButton
                                imageUrl={fromCoin.image}
                                value={fromCoin.symbol}
                                onClick={() => {
                                    openCurrencySearch && setOpenCurrencySearch(!openCurrencySearch);
                                    setOpenCoinSearch(!openCoinSearch);
                                }}
                            />
                            <div className='h-9 w-[1px] bg-gray-700 mr-6'></div>
                            <SelectButton
                                value={toCurrency}
                                onClick={() => {
                                    openCoinSearch && setOpenCoinSearch(!openCoinSearch);
                                    setOpenCurrencySearch(!openCurrencySearch);
                                }}
                            />
                        </div>
                        <div className='flex mt-5 space-x-2'>
                            <input type="number" placeholder="Enter a value" value={fromAmount == 0 ? '' : fromAmount} className={`bg-gray-800 w-full p-2 outline-none`} onChange={(e) => {
                                setFromAmount(Number(e.target.value));
                            }} />
                            <input type="number" value={toAmount == 0 ? '' : toAmount} className={`bg-gray-800 w-full p-2 outline-none`} onChange={(e) => {
                                setToAmount(Number(e.target.value));
                            }} />
                        </div>
                    </div>
                </div>
                <ConvertButton fromAmount={fromAmount} fromCoin={fromCoin} toCurrency={toCurrency} onConvert={setToAmount} />
            </div>
        </div>
    );
}

export default Converter;
