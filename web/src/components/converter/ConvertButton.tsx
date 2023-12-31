import { Coin, ConversionResult } from '../../types';
import { CtaButton } from '..';
import { useState } from 'react';
import { PROD_API_URL } from '../../constants';
import toast from 'react-hot-toast';
import axios from 'axios';

function ConvertButton({ fromAmount, fromCoin, toCurrency, onConvert }: { fromAmount: number, fromCoin: Coin, toCurrency: string, onConvert: (e: number) => void }) {
    const [loading, setLoading] = useState(false);
    return (
        <div className='mt-24'>
            <CtaButton className='uppercase' text={loading ? "Calculating..." : `Convert ${fromCoin.symbol} to ${toCurrency}`} onpress={() => {
                if (loading || fromAmount <= 0) return;
                setLoading(true);
                axios.get(`${PROD_API_URL}/convert/${fromCoin.id}/${toCurrency}/${fromAmount}`).then((res) => {
                    const data = res.data as ConversionResult;
                    onConvert(data.conversion);
                }).catch((err) => {
                    toast.error(err);
                    console.log(err);
                }
                ).finally(() => {
                    setLoading(false);
                })
            }} />
        </div>
    )
}

export default ConvertButton