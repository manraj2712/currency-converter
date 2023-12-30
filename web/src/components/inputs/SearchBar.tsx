import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function SearchBar({ title, placeholder, values, onSelect, onClose }: { title: string, placeholder: string, onSelect: (e: string) => void, onClose: () => void, values: { name: string, image?: string }[] }) {
    const [searchList, setSearchList] = useState(values.slice(0, 3));

    return (
        <div className='rounded-md mb-5'>
            <div className='bg-gray-900 mt-3 px-4 py-7 pb-10 rounded-md'>
                {/* Search Box */}
                <div className='flex justify-between'>
                    <p className='text-xl font-semibold'>{title}</p>
                    <XMarkIcon className='h-6 w-6 hover:cursor-pointer' onClick={onClose} />
                </div>
                <div className='flex space-x-1 mt-6 bg-gray-700 justify-center items-center rounded-md px-3 '>
                    <MagnifyingGlassIcon className='h-8 w-8 text-gray-500' />
                    <input type="text" className='w-full p-2 bg-transparent outline-none' placeholder={placeholder}
                        onChange={(e) => {
                            setSearchList(values.filter((currency) => {
                                return currency.name.toLowerCase().includes(e.target.value.toLowerCase());
                            }).slice(0, 3));
                        }}
                    />
                </div>

                {/* Currency List */}
                <div className='mt-5'>
                    {
                        searchList.map((val) => {
                            return (
                                <div key={val.name} className='flex items-center space-x-3 mt-3 hover:bg-gray-700 rounded-md p-2 hover:cursor-pointer' onClick={() => {
                                    onSelect(val.name);
                                }}>
                                    {val.image != undefined ? <img src={val.image} alt={val.name} className='h-8 w-8' /> : <>  </>}
                                    <p className='text-lg font-semibold uppercase'>{val.name}</p>
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