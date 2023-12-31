
import { Toaster } from 'react-hot-toast';
import { Navbar, ConverterSkeleton, Converter } from './components';
import useGetCurrencies from './hooks/useGetCurrencies';

function App() {

  const coinsAndCurrencies = useGetCurrencies();

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2000,
        }}
      />
      <div className='h-full'>
        <Navbar />
        {coinsAndCurrencies ? <Converter coinsAndCurrencies={coinsAndCurrencies} /> : <ConverterSkeleton />}
      </div>
    </>
  )
}

export default App
