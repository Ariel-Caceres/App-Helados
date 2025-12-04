import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"

export const Modal = () => {
    const navigate = useNavigate()

    const { sabor, precio, cantidad, setSabor, setPrecio, setCantidad, registrarVenta } = useSell()

    const changeHandler = (valor: string) => {
        setPrecio(valor)
    }

    const changeHandlerSabor = (sabor: string) => {
        setSabor(sabor)
    }

    const changeHandlerCantidad = (cantidad: string) => {
        setCantidad(cantidad)
    }


    // return (
    //     <div className='min-w-1/2 h-full flex flex-col mt-32 gap-10'>
    //         <Header />
    //         <div className='w-full h-96 bg-[#DAF5FF] rounded-2xl flex flex-col justify-center items-center'>
    //             <div className='w-full flex  h-1/5 items-center  bg-amber-200 rounded-2xl '>
    //                 <span className='text-3xl font-medium ml-10'>🤑Vender:    </span>
    //             </div>
    //             <div className='w-1/3  flex justify-center h-full items-center flex-col gap-5   '>
    //                 <div className="w-full  flex bg-[#B1F6FF] h-20 justify-evenly items-center rounded-2xl border-2">
    //                     <label htmlFor="precio" className="text-2xl w-1/3 font-medium">Precio:</label>
    //                     <input type="number" id="precio" name="precio" placeholder="Ej. 100$" className="border-2 pl-2 rounded-xl h-10 bg-white" value={precio} onChange={(e) => changeHandler(e.target.value)} />
    //                 </div>
    //                 <div className="w-full  flex bg-[#B1F6FF] h-20 justify-evenly items-center rounded-2xl border-2">
    //                     <label htmlFor="sabor" className="text-2xl w-1/3 font-medium">Sabor:</label>
    //                     <input type="text" id="sabor" name="sabor" placeholder="Ej. Coco" className="border-2 pl-2 rounded-xl h-10 bg-white" value={sabor} onChange={(e) => changeHandlerSabor(e.target.value)} />
    //                 </div>
    //                 <div className="w-full  flex bg-[#B1F6FF] h-20 justify-evenly items-center rounded-2xl border-2">
    //                     <label htmlFor="cantidad" className="text-2xl w-1/3 font-medium">Cantidad:</label>
    //                     <input type="number" id="cantidad" name="cantidad" placeholder="Ej. 1" className="border-2 pl-2 rounded-xl h-10 bg-white" value={cantidad} onChange={(e) => changeHandlerCantidad(e.target.value)} />
    //                 </div>
    //             </div>
    //         </div>
    //         <div className='w-full h-15 flex justify-evenly'>
    //             <div className="bg-white w-1/5 items-center flex justify-center text-black  rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all ease-in-out delay-100">
    //                 <button className="w-full h-full hover:cursor-pointer" onClick={() => navigate("/")}>
    //                     <span className="text-2xl font-bold">Cancelar</span>
    //                 </button>
    //             </div>
    //             <div className="bg-white w-1/5 items-center flex justify-center text-black  rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all ease-in-out delay-100">
    //                 <button className="w-full h-full hover:cursor-pointer" onClick={() => { navigate("/"); registrarVenta() }}>
    //                     <span className="text-2xl font-bold">Confirmar</span>
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (

        <div className='w-full max-w-[900px] mx-auto flex flex-col mt-32 md:mt-15 gap-10 px-4'>
            <Header />

            {/* CARD PRINCIPAL */}
            <div className='w-full min-h-112 bg-[#DAF5FF] rounded-2xl flex flex-col items-center'>

                {/* TÍTULO */}
                <div className='w-full h-16 flex items-center bg-amber-200 rounded-t-2xl'>
                    <span className='text-2xl sm:text-3xl font-medium ml-6 sm:ml-10'>🤑 Vender:</span>
                </div>

                {/* FORM */}
                <div className='w-full sm:w-2/3 lg:w-1/3 flex flex-col items-center gap-5 mt-10'>

                    {/* PRECIO */}
                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="precio" className="text-lg sm:text-2xl font-medium w-1/3">Precio:</label>
                        <input
                            type="number"
                            id="precio"
                            placeholder="Ej. 100$"
                            className="border-2 pl-2 rounded-xl h-10 bg-white w-2/3"
                            value={precio}
                            onChange={(e) => changeHandler(e.target.value)}
                        />
                    </div>

                    {/* SABOR */}
                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="sabor" className="text-lg sm:text-2xl font-medium w-1/3">Sabor:</label>
                        <input
                            type="text"
                            id="sabor"
                            placeholder="Ej. Coco"
                            className="border-2 pl-2 rounded-xl h-10 bg-white w-2/3"
                            value={sabor}
                            onChange={(e) => changeHandlerSabor(e.target.value)}
                        />
                    </div>

                    {/* CANTIDAD */}
                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            placeholder="Ej. 1"
                            className="border-2 pl-2 rounded-xl h-10 bg-white w-2/3"
                            value={cantidad}
                            onChange={(e) => changeHandlerCantidad(e.target.value)}
                        />
                    </div>

                </div>
            </div>

            {/* BOTONES */}
            <div className='w-full flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-0'>

                <div className="bg-white w-full sm:w-1/4 h-14 flex items-center justify-center text-black rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all">
                    <button className="w-full h-full hover:cursor-pointer" onClick={() => navigate("/")}>
                        <span className="text-xl sm:text-2xl font-bold">Cancelar</span>
                    </button>
                </div>

                <div className="bg-white w-full sm:w-1/4 h-14 flex items-center justify-center text-black rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all">
                    <button className="w-full h-full hover:cursor-pointer" onClick={() => { navigate("/"); registrarVenta() }}>
                        <span className="text-xl sm:text-2xl font-bold">Confirmar</span>
                    </button>
                </div>

            </div>
        </div>

    )
}