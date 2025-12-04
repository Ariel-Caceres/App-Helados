import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"


export const Home = () => {
    const navigate = useNavigate()
    const { ventas } = useSell()
    const hoy = new Date().toISOString().slice(0, 10);
    const ventasHoy = ventas.filter(v => v.fecha == hoy)
    const DineroHoy = ventas.reduce((acc, v) => acc + v.precio, 0)
    console.log(ventasHoy)
    // return (
    //     <div className='min-w-1/2 h-full flex flex-col mt-32 gap-10'>
    //         <Header />
    //         <div className='w-full h-96 bg-[#DAF5FF] rounded-2xl flex flex-col justify-evenly relative'>
    //             <div className='absolute top-0 w-full flex  h-1/5 items-center  bg-amber-200 rounded-2xl '>
    //                 <span className='text-3xl font-medium ml-10'>📊Panel:    </span>
    //             </div>
    //             <div className='w-full  flex justify-evenly'>
    //                 <div className='w-1/3  bg-[#FFBFA0] h-40 rounded-2xl flex-col flex border-2'>
    //                     <div className="w-full justify-center flex h-1/3 items-center">
    //                         <span className="text-2xl font-medium">🧊Ventas hoy :</span>
    //                     </div>
    //                     <div className="w-full justify-center flex h-1/3 items-center">
    //                         <span className="text-4xl font-bold">{ventasHoy.length}</span>
    //                     </div>
    //                 </div>
    //                 <div className='w-1/3 bg-[#87F6FF] h-40 rounded-2xl flex-col flex border-2 '>
    //                     <div className="w-full justify-center flex h-1/3 items-center">
    //                         <span className="text-2xl font-medium  ">💸Dinero hoy :</span>
    //                     </div>
    //                     <div className="w-full justify-center flex h-1/3 items-center ">
    //                         <span className="text-4xl font-bold">{DineroHoy}$</span>
    //                     </div>

    //                 </div>
    //             </div>
    //         </div>
    //         <div className='w-full h-15 flex justify-center '>
    //             <div className="bg-white w-1/5 items-center flex justify-center text-black  rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all ease-in-out delay-100">
    //                 <button className="w-full h-full hover:cursor-pointer" onClick={() => navigate("/sell")}>
    //                     <span className="text-2xl font-bold">Vender</span>
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className="w-full max-w-3xl mx-auto h-full flex flex-col mt-20 gap-10 px-4">

            <Header />

            <div className="w-full bg-[#DAF5FF] rounded-2xl flex flex-col justify-evenly relative py-6">

                <div className="absolute top-0 left-0 right-0 flex items-center h-14 bg-amber-200 rounded-2xl px-6">
                    <span className="text-2xl md:text-3xl font-medium">📊 Panel</span>
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
                            <span className="text-4xl font-bold">{ventasHoy.length}</span>
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
                            <span className="text-4xl font-bold">{DineroHoy}$</span>
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