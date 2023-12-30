import { Coin, ConversionResult } from '../../types';
import { CtaButton } from '..';
import { useState } from 'react';
import { API_URL } from '../../constants';

function ConvertButton({ fromAmount, fromCoin, toCurrency, onConvert }: { fromAmount: number, fromCoin: Coin, toCurrency: string, onConvert: (e: number) => void }) {
    const [loading, setLoading] = useState(false);
    return (
        <div className='mt-24'>
            <CtaButton className='uppercase' text={loading ? "Calculating..." : `Convert ${fromCoin.symbol} to ${toCurrency}`} onpress={() => {
                if (loading || fromAmount <= 0) return;
                setLoading(true);
                fetch(`${API_URL}/convert/${fromCoin.id}/${toCurrency}/${fromAmount}`, {
                    method: 'GET',
                }).then((res) => {
                    if (res.status === 200) {
                        res.json().then((data: ConversionResult) => {
                            onConvert(data.conversion);
                        })
                    }
                }).catch((err) => {
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