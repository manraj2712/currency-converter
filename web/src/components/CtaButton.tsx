function CtaButton({ text }: { text: string }) {
    return (
        <button className='w-full px-2 py-3 rounded-md bg-emerald-500 hover:bg-emerald-400' onClick={() => { }}>
            <p className='text-center font-bold text-neutral-800'>{text}</p>
        </button>
    )
}

export default CtaButton