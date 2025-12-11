import { useOnline } from "../context/useOnline"
import { useSell } from "../context/useSell"


export const Month = ({ mes }: { mes: string }) => {
    const { ventas, hoy } = useSell()
    const { online } = useOnline()
    const ventasMes = ventas.filter(v => v.fecha.split("-")[1] === mes)
    console.log(ventasMes)


    return (
        <div>
            {ventasMes.length != 0 &&
                <div>
                    venttas este mes

                    {ventasMes.map((v, i) => (
                        <div className="flex justify-between min-h-12 " key={i}>
                            <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center  ">
                                <span>{v.fecha}</span>
                            </div>
                            <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                <span>{v.sabor}</span>
                            </div>
                            <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                <span>{v.cantidad}</span>
                            </div>
                            <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                <span>${v.precioTotal}</span>
                            </div>
                            <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                <button className="bg-[#87F6FF] w-1/2 h-full border rounded-md" >
                                    <span className="text-2xl">
                                        {online ? <i className="fa-regular fa-pen-to-square"></i> : "✏"}
                                    </span>
                                </button>
                                <button className="bg-[#FFBFA0] w-1/2 h-full border rounded-md" >
                                    <span className="text-2xl">
                                        {online ? <i className="fa-regular fa-trash-can "></i> : "🗑"}
                                    </span>
                                </button>

                            </div>
                        </div>))}
                </div>
            }
            {ventasMes.length == 0 &&
                <span>no hay ventas este mes</span>
            }
        </div>
    )
}