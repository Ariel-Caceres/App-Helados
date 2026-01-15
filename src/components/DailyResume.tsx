import { useEffect, useMemo, useState } from "react"
import { useOnline } from "../hooks/useOnline"
import { useSell } from "../hooks/useSell"
import { useSalesDb } from "../hooks/useSalesDb"
import { useNavigate } from "react-router-dom"

export const DailyResume = ({ producto, animar }: { producto: string, animar: boolean }) => {
    const { online } = useOnline()
    const { ventas, hoy } = useSell()
    const { ventasDb, cargando } = useSalesDb()
    const [dineroHoy, setDineroHy] = useState<number>()
    const [cantHoy, setCantHoy] = useState<number>()
    const navigate = useNavigate()

    const ventasHoy = useMemo(() => {
        const fuente = online && !cargando ? ventasDb : ventas
        if (fuente) {
            return fuente.filter(v => { return v.fecha.split("-")[2] == hoy.split("-")[2] })
        }
    }, [hoy, online, ventas, ventasDb])

    const calcularTotal = (parametro: string) => {
        if (ventasHoy) {
            const ventasAMostrar = ventasHoy.filter(v => v.producto ? v.producto == parametro : true)
            const dineroAMostrar = ventasAMostrar.reduce((acc, v) => v.precioTotal + acc, 0)
            const cantAMostrar = ventasAMostrar.reduce((acc, v) => v.cantidad + acc, 0)
            setDineroHy(dineroAMostrar)
            setCantHoy(cantAMostrar)
        } else {
            setDineroHy(0)
            setCantHoy(0)
        }
    }

    useEffect(() => {
        calcularTotal(producto)
    }, [producto, cargando])





    return (
        <div className="w-full border flex bg-[#DAF5FF] rounded-2xl   flex-col justify-between relative  overflow-hidden" >

            <div className=" border top-0 left-0 gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between z-10   bg-amber-200 rounded-2xl px-6 py-4 ">

                <div className="text-xl whitespace-nowrap md:text-3xl font-medium">
                    {online ? <i className="fa-solid fa-chart-simple"></i> : "📊"}
                    <span>
                        Panel Diario
                    </span>
                </div>

                {!online &&
                    <div className=" justify-end flex items-end ">
                        <button className="text-sm   text-end whitespace-nowrap sm:text-2xl font-medium self-end justify-self-end border-2 rounded-2xl cursor-pointer p-1" onClick={() => navigate("/record")}>
                            {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                            <span className=""> Ver Historial</span>
                        </button>
                    </div>
                }


            </div>

            <div
                className={`  w-full flex flex-row md:flex-row justify-evenly gap-4 p-2 px-2   transition-all duration-300 ease-in-out filter ${animar ? "-translate-y-12/12" : "translate-y-0"} `}         >

                <div className="w-1/2 md:w-1/3    bg-[#FFBFA0] min-h-20 md:h-25 rounded-2xl flex flex-col border-2 shadow-md p-2 ">
                    <div className="w-full flex justify-center items-center text-xl md:text-2xl font-medium">
                        {online ? <i className="fa-solid fa-cash-register text-xl"></i> : "🧊"}
                        <span className="">
                            Ventas hoy:
                        </span>
                    </div>
                    <div className="w-full flex justify-center items-center flex-1 gap-2 animate-pulse">
                        <span className="text-2xl font-bold">{cantHoy} </span>
                        <span className="text-xl font-medium"> {producto == "helado" ? "uds" : "kgs"}</span>
                    </div>
                </div>

                <div className="      w-1/2 md:w-1/3      bg-[#87F6FF]      min-h-20 md:h-25    rounded-2xl flex flex-col      border-2 shadow-md       p-2  ">
                    <div className="w-full flex justify-center items-center text-xl md:text-2xl font-medium">
                        {online ? <i className="fa-regular fa-money-bill-1 text-xl"></i> : "💸"}
                        <span className="">
                            Dinero hoy:
                        </span>
                    </div>
                    <div className="w-full flex justify-center items-center flex-1">
                        <span className="text-2xl font-bold animate-pulse">${dineroHoy}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}   