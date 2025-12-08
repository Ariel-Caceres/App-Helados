import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { Edit } from "./Edit"
import { useSell } from "../context/useSell"
import type { Venta } from "../context/SellContext"
import { useState } from "react"
import { ModalDelete } from "../components/ModalDelete"
import { useOnline } from "../context/useOnline"


export const Record = () => {
    const { ventas, setVentas } = useSell()
    const navigate = useNavigate()
    const hayVentas = ventas.length > 0
    const ventasTotalDinero = ventas.reduce((acc, v) => acc + v.precio, 0)
    const ventasTotalCantidad = ventas.reduce((acc, v) => acc + v.cantidad, 0)
    const [transaccion, setTransaccion] = useState<Venta>()
    const [ventaAEditar, setVentaAEditar] = useState<Venta>()
    const [mostrarModalEliminar, setModalEliminar] = useState<boolean>(false)
    const vaciarVentaAEditar = () => setVentaAEditar(undefined)
    const online = useOnline()

    const eliminarTransaccion = (transaccion: Venta) => {
        const transBorrado = ventas.filter(v => v !== transaccion)
        setVentas(transBorrado)
    }


    return (
        <div className={`w-full max-w-3xl mx-auto  mt-[5vh] flex flex-col gap-10 px-2 `}>

            <Header />

            {ventaAEditar ?
                <Edit ventaAEditar={ventaAEditar} vaciarVentaAEditar={vaciarVentaAEditar} />
                :
                <div>

                    <div className="w-full bg-[#DAF5FF] rounded-2xl flex flex-col justify-evenly relative py-6">

                        <div className="absolute top-0 left-0 gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between   bg-amber-200 rounded-2xl px-6 py-4 ">
                            <div className="text-2xl whitespace-nowrap md:text-3xl font-medium">
                                {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                                <span className=""> Historial</span>
                            </div>

                        </div>



                        <div className=" flex flex-col md:flex-row justify-evenly gap-4 mt-16 px-2 max-h-[30vh] overflow-auto ">

                            <div className="flex flex-col w-full min-w-xl " >
                                {mostrarModalEliminar && transaccion ?
                                    <ModalDelete transaccion={transaccion} eliminarTransaccion={() => eliminarTransaccion(transaccion)} setModalEliminar={() => setModalEliminar(false)} />
                                    :

                                    <>
                                        <div className="  flex justify-between  " >
                                            <div className="w-1/4 border-2  border-r-0 ">
                                                <span className="pl-2 text-xl font-bold">Fecha</span>
                                            </div>
                                            <div className="w-1/4 border-2 border-r-0">
                                                <span className="pl-2 text-xl font-bold">Sabor</span>
                                            </div>
                                            <div className="w-1/4 border-2 border-r-0">
                                                <span className="pl-1 text-xl font-bold">Cantidad</span>
                                            </div>
                                            <div className="w-1/4 border-2 border-r-0">
                                                <span className="pl-2 text-xl font-bold">Precio</span>
                                            </div>
                                            <div className="w-1/4 border-2 ">
                                                <span className="pl-2 text-xl font-bold">Acciones</span>
                                            </div>

                                        </div>


                                        {ventas.map((v, i) => (
                                            <div className="flex justify-between min-h-12 " key={i}>
                                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                                    <span>{v.fecha}</span>
                                                </div>
                                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                                    <span>{v.sabor}</span>
                                                </div>
                                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                                    <span>{v.cantidad}</span>
                                                </div>
                                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                                    <span>${v.precio}</span>
                                                </div>
                                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                                    <button className="bg-[#87F6FF] w-1/2 h-full" onClick={() => { setVentaAEditar(v) }}>
                                                        <span className="text-2xl">
                                                            {online ? <i className="fa-regular fa-pen-to-square"></i> : "✏"}
                                                        </span>
                                                    </button>
                                                    <button className="bg-[#FFBFA0] w-1/2 h-full" onClick={() => { setModalEliminar(true); setTransaccion(v) }}>
                                                        <span className="text-2xl">
                                                            {online ? <i className="fa-regular fa-trash-can "></i> : "🗑"}
                                                        </span>
                                                    </button>

                                                </div>
                                            </div>
                                        ))}

                                        {hayVentas ?
                                            <div className="w-full flex  justify-end">
                                                <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0">
                                                    <span>Total =</span>
                                                </div>
                                                <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0">
                                                    <span>{ventasTotalCantidad}</span>
                                                </div>
                                                <div className="w-1/5 border-2 border-gray-600 justify-center flex">
                                                    <span>${ventasTotalDinero}</span>
                                                </div>
                                                <div className="w-1/5">

                                                </div>
                                            </div>
                                            :
                                            <div className="w-full flex justify-center border-2 mt-2 p-2">
                                                <span className="text-xl">
                                                    Todavía no hay ventas 😿
                                                </span>
                                            </div>
                                        }

                                    </>
                                }





                            </div>
                        </div>

                    </div>

                    <div className="w-full flex justify-center">
                        <div className="mt-20
                bg-white w-2/3 md:w-1/5 
                flex items-center justify-center 
                text-black rounded-2xl border-2
                hover:bg-black hover:text-white hover:border-[#DAF5FF]
                transition-all ease-in-out duration-200">
                            <button className="w-full h-full py-2 cursor-pointer " onClick={() => navigate("/")}>
                                <span className="text-xl md:text-2xl font-bold">
                                    Volver
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

            }
        </div >
    )


}