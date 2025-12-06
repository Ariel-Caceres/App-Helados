import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"


export const Home = () => {
    const navigate = useNavigate()
    const { ventas, hoy } = useSell()


    const DineroHoy = ventas.reduce((acc, v) => acc + v.precio, 0)
    const ventasHoy = ventas.filter(v => v.fecha === hoy)
    const ventasHoyCant = ventasHoy.reduce((acc, va) => acc + va.cantidad, 0);



    return (
        <div className="w-full max-w-3xl mx-auto h-full flex flex-col mt-20 gap-10 px-4">

            <Header />

            <div className="w-full bg-[#DAF5FF] rounded-2xl flex  flex-col justify-evenly relative py-6">

                <div className="absolute top-0 left-0 gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between   bg-amber-200 rounded-2xl px-6 py-4 ">
                    <div className="">
                        <span className="text-2xl whitespace-nowrap md:text-3xl font-medium">📊 Panel</span>

                    </div>
                    <div className=" justify-end flex items-end ">
                        <button className="" onClick={() => navigate("/record")}>
                            <span className="text-md text-end whitespace-nowrap sm:text-2xl font-medium self-end justify-self-end border-2 rounded-2xl p-1 cursor-pointer">🗓 Ver historial</span>
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
                        <div className="w-full flex justify-center items-center">
                            <span className="text-xl md:text-2xl font-medium">
                                🧊 Ventas hoy:
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center flex-1">
                            <span className="text-4xl font-bold">{ventasHoyCant}</span>
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
                        <div className="w-full flex justify-center items-center">
                            <span className="text-xl md:text-2xl font-medium">
                                💸 Dinero hoy:
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center flex-1">
                            <span className="text-4xl font-bold">${DineroHoy}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="
        bg-white w-2/3 md:w-1/5 
        flex items-center justify-center 
        text-black rounded-2xl border-2
        hover:bg-black hover:text-white hover:border-[#DAF5FF]
        transition-all ease-in-out duration-200
      ">
                    <button
                        className="w-full h-full py-2"
                        onClick={() => navigate('/sell')}
                    >
                        <span className="text-xl md:text-2xl font-bold">
                            Vender
                        </span>
                    </button>
                </div>
            </div>

        </div>
    );

}