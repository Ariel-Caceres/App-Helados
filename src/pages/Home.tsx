import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"
import { useOnline } from "../context/useOnline"
import { Button } from "../components/Button"
import { useEffect, useState } from "react"

export const Home = () => {
    const navigate = useNavigate()
    const { ventas, hoy } = useSell()
    const { online } = useOnline()

    const ventasHoy = ventas.filter(v => {
        return v.fecha.split("-")[2] == hoy.split("-")[2] && v.status != "pending-delete"
    })

    const [mpd, setmpd] = useState(1)
    const [dineroHoy, setDineroHy] = useState<number>()
    const [cantHoy, setCantHoy] = useState<number>()
    const [animar, setAnimar] = useState<boolean>()
    const productos: Record<string, () => string> = {
        1: () => "helado",
        2: () => "carne-picada",
        3: () => "pollo-trozado"
    }

    const calcularTotal = (parametro: string) => {
        const ventasAMostrar = ventasHoy.filter(v => v.producto ? v.producto == parametro : true)
        const dineroAMostrar = ventasAMostrar.reduce((acc, v) => v.precioTotal + acc, 0)
        const cantAMostrar = ventasAMostrar.reduce((acc, v) => v.cantidad + acc, 0)
        setDineroHy(dineroAMostrar)
        setCantHoy(cantAMostrar)
    }

    useEffect(() => {
        setAnimar(true)
        setTimeout(() => {
            setAnimar(false)
        }, 500)
        calcularTotal(productos[mpd]())
    }, [mpd])



    return (
        <div className="w-full  max-w-3xl mx-auto  flex mt-[5vh]  flex-col gap-5 px-2 overflow-hidden ">

            <Header />

            <div className="w-full border flex bg-[#DAF5FF] rounded-2xl   flex-col justify-evenly relative pt-6 overflow-hidden" >

                <div className="absolute border top-0 left-0 gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between z-10   bg-amber-200 rounded-2xl px-6 py-4 ">

                    <div className="text-2xl whitespace-nowrap md:text-3xl font-medium">
                        {online ? <i className="fa-solid fa-chart-simple"></i> : "📊"}
                        <span>
                            Panel diario
                        </span>
                    </div>

                    <div className=" justify-end flex items-end ">
                        <button className="text-xl text-end whitespace-nowrap sm:text-2xl font-medium self-end justify-self-end border-2 rounded-2xl cursor-pointer p-1" onClick={() => navigate("/record")}>
                            {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                            <span className=""> Historial</span>
                        </button>
                    </div>
                </div>

                <div className={`w-full flex flex-row md:flex-row justify-evenly gap-4 mt-16 px-2 transition-all ease-in-out   ${animar ? "invert-100 -translate-y-150 " : ""}`}>

                    {/* Venta hoy */}
                    <div className="w-1/2 md:w-1/3    bg-[#FFBFA0] min-h-20 md:h-25 rounded-2xl flex flex-col border-2 shadow-md p-2 ">
                        <div className="w-full flex justify-center items-center text-xl md:text-2xl font-medium">
                            {online ? <i className="fa-solid fa-cash-register text-xl"></i> : "🧊"}
                            <span className="">
                                Ventas hoy:
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center flex-1">
                            <span className="text-2xl font-bold animate-pulse">{cantHoy}</span>
                        </div>
                    </div>

                    {/* Dinero hoy */}
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

                <div className={`flex w-full justify-center text-2xl p-4 text-center items-center`}>
                    <div className="w-80 sm:w-2/3 flex justify-center items-center">
                        <div className=" border-2 rounded-2xl " onClick={() => setmpd(mpd > 1 ? mpd - 1 : 3)}>
                            <span ><i className="fa-solid fa-angle-left p-2"></i></span>
                        </div>
                        <div className={`w-2/3 font-bold ${animar ? "animate-bounce" : ""}`}>
                            <span>{productos[mpd]() == "helado" ? "Helado" : productos[mpd]() == "pollo-trozado" ? "Pollo Trozado" : productos[mpd]() == "carne-picada" ? "Carne Picada" : ""}</span>
                        </div>
                        <div className="border-2 rounded-2xl" onClick={() => setmpd(mpd < 3 ? mpd + 1 : 1)}>
                            <span ><i className="fa-solid fa-angle-right p-2"></i></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="  w-[98%]   flex flex-col-reverse  justify-center  items-center gap-4  absolute bottom-[5vh]  sm:static  sm:flex-row  sm:gap-10  sm:justify-evenly " >
                <Button tipo="button" texto={"Comprar"} onClick={() => navigate("/buy")} />
                <Button tipo="button" texto={"Vender"} onClick={() => navigate("/sell")} />
            </div>

        </div>
    );

}