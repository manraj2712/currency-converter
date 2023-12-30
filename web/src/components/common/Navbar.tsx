const Navbar = () => {
    let Links: Array<{ name: string, link: string }> = [
    ];

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-gray-950 py-4 md:px-10 px-7'>
                {/* logo section */}
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1 text-emerald-500'>
                    <span>Crypto Converter</span>
                </div>
                
            </div>
        </div>
    );
};

export default Navbar;