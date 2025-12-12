

export const Button = ({ texto, onClick, tipo }: { texto: string, onClick: () => void, tipo: 'submit' | 'reset' | 'button' | undefined }) => {
    return (

        <div className="
    bg-white w-2/3 md:w-1/5 
    flex items-center justify-center 
    text-black rounded-2xl border-2
    hover:bg-black hover:text-white hover:border-[#DAF5FF]
    transition-all ease-in-out duration-200 

    ">
            <button
                type={tipo}
                className="w-full h-full py-2 cursor-pointer flex items-center justify-center"
                onClick={onClick}>
                {texto == "Volver" ?
                    <i className="fa-solid fa-angle-left"></i>
                    : ""
                }
                <span className="text-xl md:text-2xl font-bold">
                    {texto}
                </span>
            </button>
        </div>
    )
}