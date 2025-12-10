import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"
import { useOnline } from "../context/useOnline"
import { Button } from "../components/Button"


export const Home = () => {
    const navigate = useNavigate()
    const { ventas, hoy } = useSell()
    const { online } = useOnline()

    const ventasHoy = ventas.filter(v => v.fecha === hoy)
    const ventasHoyCant = ventasHoy.reduce((acc, va) => acc + va.cantidad, 0);
    const DineroHoy = ventasHoy.reduce((acc, v) => v.precioTotal ? acc + v.precioTotal : acc + (v.precio * v.cantidad), 0)



    return (
        <div className="w-full  max-w-3xl mx-auto  flex mt-[5vh]  flex-col gap-10 px-2">

            <Header />

            <div className="w-full border bg-[#DAF5FF] rounded-2xl flex  flex-col justify-evenly relative py-6">

                <div className="absolute border top-0 left-0 gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between   bg-amber-200 rounded-2xl px-6 py-4 ">

                    <div className="text-2xl whitespace-nowrap md:text-3xl font-medium">
                        {online ? <i className="fa-solid fa-chart-simple"></i> : "📊"}
                        <span>
                            Panel
                        </span>
                    </div>

                    <div className=" justify-end flex items-end ">
                        <button className="text-xl text-end whitespace-nowrap sm:text-2xl font-medium self-end justify-self-end border-2 rounded-2xl cursor-pointer p-1" onClick={() => navigate("/record")}>
                            {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                            <span className=""> Ver historial</span>
                        </button>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-evenly gap-4 mt-16 px-2">

                    {/* Venta hoy */}
                    <div className="w-full md:w-1/3  
          bg-[#FFBFA0] 
          min-h-32 md:h-40 
          rounded-2xl flex flex-col 
          border-2 shadow-md
          p-4
        ">
                        <div className="w-full flex justify-center items-center text-xl md:text-2xl font-medium">
                            {online ? <i className="fa-solid fa-cash-register text-3xl"></i> : "🧊"}
                            <span className="">
                                Ventas hoy:
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center flex-1">
                            <span className="text-4xl font-bold animate-pulse">{ventasHoyCant}</span>
                        </div>
                    </div>

                    {/* Dinero hoy */}
                    <div className="
          w-full md:w-1/3  
          bg-[#87F6FF] 
          min-h-32 md:h-40 
          rounded-2xl flex flex-col 
          border-2 shadow-md
          p-4
        ">
                        <div className="w-full flex justify-center items-center text-xl md:text-2xl font-medium">
                            {online ? <i className="fa-regular fa-money-bill-1 text-3xl"></i> : "💸"}
                            <span className="">
                                Dinero hoy:
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center flex-1">
                            <span className="text-4xl font-bold animate-pulse">${DineroHoy}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center flex-wrap gap-5 ">
                <Button texto={"Vender"} onClick={() => navigate("/sell")} />
                <Button texto={"Comprar"} onClick={() => navigate("/buy")} />
            </div>

        </div>
    );

}