import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"


export const Record = () => {
    const { ventas } = useSell()
    const navigate = useNavigate()
    const hayVentas = ventas.length > 0

    const ventasTotalDinero = ventas.reduce((acc, v) => acc + v.precio, 0)
    const ventasTotalCantidad = ventas.reduce((acc, v) => acc + v.cantidad, 0)

    // const mesAEleccion = ventas.filter(v => (v.fecha.split("-")[1] === "01"))
    // console.log(mesAEleccion)


    return (
        <div className="w-full max-w-3xl mx-auto h-full flex flex-col mt-20 gap-10 px-4">

            <Header />

            <div className="w-full bg-[#DAF5FF] rounded-2xl flex flex-col justify-evenly relative py-6">

                <div className="absolute top-0 left-0 right-0 flex items-center h-14 bg-amber-200 rounded-2xl justify-between px-6">
                    <span className="text-2xl md:text-3xl font-medium">🗓 Historial</span>
                    <div className="">
                        <span className="text-xl sm:text-md font-medium">Filtrar</span>
                        <select name="" id=""></select>
                    </div>
                </div>


                <div className="w-full flex flex-col md:flex-row justify-evenly gap-4 mt-16 px-2 max-h-[30vh] overflow-y-scroll  ">
                    <div className="flex flex-col w-full " >
                        <div className="w-full  flex justify-between" >
                            <div className="w-1/4 border-2  border-r-0 ">
                                <span className="pl-2 text-xl font-bold">Fecha</span>
                            </div>
                            <div className="w-1/4 border-2 border-r-0">
                                <span className="pl-2 text-xl font-bold">Sabor</span>
                            </div>
                            <div className="w-1/4 border-2 border-r-0">
                                <span className="pl-1 text-xl font-bold">Cantidad</span>
                            </div>
                            <div className="w-1/4 border-2 ">
                                <span className="pl-2 text-xl font-bold">Precio</span>
                            </div>
                        </div>
                        {ventas.map((v, i) => (
                            <div className="w-full  flex justify-between" key={i}>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>{v.fecha}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>{v.sabor}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>{v.cantidad}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>{v.precio}</span>
                                </div>
                            </div>

                        ))}
                        {hayVentas ?
                            <div className="w-full flex  justify-end">
                                <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                                    <span>Total =</span>
                                </div>
                                <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                                    <span>{ventasTotalCantidad}</span>
                                </div>
                                <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                                    <span>{ventasTotalDinero}$</span>
                                </div>
                            </div>
                            :
                            <div className="w-full flex justify-center border-2 mt-2 p-2">
                                <span className="text-xl">
                                    Todavía no hay ventas 😿
                                </span>
                            </div>
                        }

                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="
                bg-white w-2/3 md:w-1/5 
                flex items-center justify-center 
                text-black rounded-2xl border-2
                hover:bg-black hover:text-white hover:border-[#DAF5FF]
                transition-all ease-in-out duration-200">
                    <button className="w-full h-full py-2 cursor-pointer" onClick={() => navigate("/")}>
                        <span className="text-xl md:text-2xl font-bold">
                            Volver
                        </span>
                    </button>
                </div>
            </div>

        </div >
    )


}