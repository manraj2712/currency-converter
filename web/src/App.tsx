
import { Navbar, ConverterSkeleton, Converter } from './components';
import useGetCurrencies from './hooks/useGetCurrencies';

function App() {

  const coinsAndCurrencies = useGetCurrencies();

  return (
    <>
      <Navbar />
      {coinsAndCurrencies ? <Converter coinsAndCurrencies={coinsAndCurrencies} /> : <ConverterSkeleton />}

    </>
  )
}

export default App
