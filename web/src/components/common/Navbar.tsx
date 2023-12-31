const Navbar = () => {

    return (
        <div className='shadow-md w-full'>
            <div className='md:flex items-center justify-between bg-gray-900 py-4 px-2 md:px-10 sm:px-7' style={{
                borderBottom: '0.5px solid rgb(55, 65, 81)'
            }}>
                <div className='flex justify-between items-center w-full'>

                    <div className='flex'>

                        <div className='h-8 w-8 sm:h-10 sm:w-10 mr-2'>
                            <svg viewBox="0.004 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z" fill="#f7931a"></path><path d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.37-.092-2.297 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726L27.504 50.8l3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.383-4.738 1.527-4.36-.075-6.875-3.225-8.516 2.294-.531 4.022-2.04 4.483-5.157zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.88 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z" fill="#ffffff"></path></g></svg>
                        </div>
                        <div className='font-bold text-base sm:text-2xl cursor-pointer flex items-center gap-1 text-emerald-500'>
                            <span>CoinConverge</span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='glow-button glow p-[6px] sm:p-3 text-sm sm:text-lg'>
                            <a href="https://github.com/manraj2712/currency-converter">Github Repo</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;