import { useOnline } from "../context/useOnline"
export const Header = () => {
    const { online } = useOnline()
    return (
        <div className='w-full justify-center flex h-20 bg-[#44FFD2] rounded-2xl text-4xl font-bold  items-center shadow-[#616163] shadow-md'>
            Helados
            {!online ?
                <h1 className=''>
                    🍧</h1>
                : <i className="fa-solid fa-ice-cream"></i>}
        </div>
    )
}