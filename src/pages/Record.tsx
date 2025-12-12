import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { Edit } from "./Edit"
import { useSell } from "../context/useSell"
import { useState } from "react"
import { ModalDelete } from "../components/ModalDelete"
import { Month } from "../components/Month"
import { useOnline } from "../context/useOnline"
import { Button } from "../components/Button"
import { useBuy } from "../context/useBuy"
import type { Venta } from "../context/SellContext"
import type { Compra } from "../context/BuyContext"


export const Record = () => {
    const { ventas, setVentas, hoy } = useSell()
    const { compras, setCompras } = useBuy()
    const navigate = useNavigate()
    const hayVentas = ventas.length > 0
    const ventasTotalDinero = ventas.reduce((acc, v) => v.precioTotal ? acc + v.precioTotal : acc + v.precio, 0)
    const ventasTotalCantidad = ventas.reduce((acc, v) => acc + v.cantidad, 0)
    const [transaccion, setTransaccion] = useState<Venta>()
    const [ventaAEditar, setVentaAEditar] = useState<Venta>()
    const [compraAEditar, setCompraAEditar] = useState<Compra>()
    const [mostrarModalEliminar, setModalEliminar] = useState<boolean>(false)
    const [mostrarModalEliminarCompra, setModalEliminarCompra] = useState<boolean>(false)
    const vaciarVentaAEditar = () => setVentaAEditar(undefined)
    const vaciarCompraAEditar = () => setCompraAEditar(undefined)
    const online = useOnline()
    const [mostrarVentas, setMostrarVentas] = useState<boolean>(false)
    const [mostrarCompras, setMostrarCompras] = useState<boolean>(false)
    const cerrarTablas = () => { setMostrarCompras(false); setMostrarVentas(false) }
    const hayCompras = compras.length > 0
    const [compraAEliminar, setCompraAEliminar] = useState<Compra>()


    // const [mesActual, setMesActual] = useState(Number(hoy.split("-")[1]))
    // const [ventasMes, setMentasMes] = useState<string>("")

    // console.log(mesActual)

    const eliminarTransaccion = (transaccion: Venta) => {
        const transBorrado = ventas.filter(v => v !== transaccion)
        setVentas(transBorrado)
    }
    const eliminarCompra = (compra: Compra) => {
        const compraBorrada = compras.filter(c => c !== compra)
        setCompras(compraBorrada)
    }


    return (
        <div className={`w-full max-w-3xl mx-auto  mt-[5vh] flex flex-col gap-10 px-2`}>

            <Header />

            {ventaAEditar ?
                <Edit ventaAEditar={ventaAEditar} onClick={vaciarVentaAEditar} />
                :
                compraAEditar ?
                    <Edit compraAEditar={compraAEditar} onClick={vaciarCompraAEditar} />
                    :
                    <div>
                        <div className={`w-full border-l border-r border-b rounded-2xl flex flex-col justify-evenly relative py-6 mb-10`}>

                            <div className=" absolute top-0 border left-0 border-t gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between   bg-amber-200 rounded-2xl px-6 py-4 ">
                                <div className="text-2xl whitespace-nowrap md:text-3xl font-medium ">
                                    {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                                    <span className=""> Historial:</span>
                                    {mostrarCompras ? " Compras" : mostrarVentas ? " Ventas" : ""}
                                </div>
                                {/* <div>
                                    <span>{mesActual}</span>
                                    <i className="fa-solid fa-angle-up p-5 border " onClick={() => { setMentasMes(String(mesActual)); setMesActual(Number(mesActual) + 1) }}></i>
                                    <i className="fa-solid fa-angle-down" onClick={() => { setMentasMes(String(mesActual)); setMesActual(Number(mesActual) - 1) }}></i>
                                </div> */}

                            </div>
                            {!mostrarCompras && !mostrarVentas &&
                                <div className="mt-20 w-full justify-center flex items-center gap-5 flex-wrap">
                                    <button className="p-5 bg-[#FFBFA0] rounded-2xl border-2 text-xl cursor-pointer font-medium sm:w-2/3 md:w-1/3 w-4/5"
                                        onClick={() => { setMostrarVentas(false); setMostrarCompras(true) }
                                        }>Compras</button>
                                    <button className="p-5 bg-[#87F6FF] rounded-2xl border-2 text-xl cursor-pointer font-medium sm:w-2/3 md:w-1/3 w-4/5 "
                                        onClick={() => { setMostrarVentas(true); setMostrarCompras(false) }
                                        }>Ventas</button>
                                </div>
                            }

                            {mostrarVentas &&
                                <div className="flex flex-col md:flex-row justify-evenly gap-4 mt-16 px-2 max-h-[30vh] overflow-auto ">
                                    <div className="flex flex-col w-full min-w-xl " >
                                        {mostrarModalEliminar && transaccion ?
                                            <ModalDelete
                                                tipo="venta"
                                                transaccion={transaccion}
                                                eliminarTransaccion={() => eliminarTransaccion(transaccion)}
                                                setModalEliminar={(v) => setModalEliminar(v)}
                                            />
                                            :

                                            <>
                                                <div className="  flex justify-between  " >
                                                    <div className="w-1/4 border-2  border-r-0 ">
                                                        <span className="pl-2 text-xl font-bold">Fecha</span>
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
                                                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center  ">
                                                            <span>{v.fecha}</span>
                                                        </div>

                                                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                                            <span>{v.cantidad}</span>
                                                        </div>
                                                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                                            <span>${v.precioTotal}</span>
                                                        </div>
                                                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                                            <button className="bg-[#87F6FF] w-1/2 h-full border rounded-md" onClick={() => { setVentaAEditar(v) }}>
                                                                <span className="text-2xl">
                                                                    {online ? <i className="fa-regular fa-pen-to-square"></i> : "✏"}
                                                                </span>
                                                            </button>
                                                            <button className="bg-[#FFBFA0] w-1/2 h-full border rounded-md" onClick={() => { setModalEliminar(true); setTransaccion(v) }}>
                                                                <span className="text-2xl">
                                                                    {online ? <i className="fa-regular fa-trash-can "></i> : "🗑"}
                                                                </span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                ))}

                                                {hayVentas ?
                                                    <div className="w-full flex  justify-start">
                                                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                                                            <span>Total =</span>
                                                        </div>
                                                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                                                            <span>{ventasTotalCantidad}</span>
                                                        </div>
                                                        <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                                                            <span>${ventasTotalDinero}</span>
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
                            }

                            {mostrarCompras &&
                                <div className="flex flex-col md:flex-row justify-evenly gap-4 mt-16 px-2 max-h-[30vh] overflow-auto ">
                                    <div className="flex flex-col w-full min-w-xl " >
                                        {mostrarModalEliminarCompra && compraAEliminar ?
                                            <ModalDelete
                                                tipo="compra"
                                                compraAEliminar={compraAEliminar}
                                                eliminarCompra={() => eliminarCompra(compraAEliminar)}
                                                setModalEliminarCompra={(v) => setModalEliminarCompra(v)}
                                            />
                                            :
                                            <>
                                                <div className="flex flex-col w-full min-w-xl " >
                                                    <div className="  flex justify-between  " >
                                                        <div className="w-1/4 border-2  border-r-0 ">
                                                            <span className="pl-2 text-xl font-bold">Fecha</span>
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


                                                </div>
                                                {hayCompras ?

                                                    compras.map((c: Compra, i) => (
                                                        <div className="flex justify-between min-h-12 " key={i}>
                                                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                                                <span>{c.fecha}</span>
                                                            </div>

                                                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                                                <span>{c.cantidad}</span>
                                                            </div>
                                                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                                                <span>${c.precio}</span>
                                                            </div>
                                                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                                                <button className="bg-[#87F6FF] w-1/2 h-full border rounded-md" onClick={() => { setCompraAEditar(c) }}>
                                                                    <span className="text-2xl">
                                                                        {online ? <i className="fa-regular fa-pen-to-square"></i> : "✏"}
                                                                    </span>
                                                                </button>
                                                                <button className="bg-[#FFBFA0] w-1/2 h-full border rounded-md" onClick={() => { setModalEliminarCompra(true); setCompraAEliminar(c) }}>
                                                                    <span className="text-2xl">
                                                                        {online ? <i className="fa-regular fa-trash-can "></i> : "🗑"}
                                                                    </span>
                                                                </button>

                                                            </div>
                                                        </div>
                                                    ))
                                                    :
                                                    <div className="w-full flex justify-center border-2 mt-2 p-2">
                                                        <span className="text-xl">
                                                            Todavía no hay compras 👍
                                                        </span>
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="w-full flex justify-center">
                            <Button texto="Volver" onClick={() => mostrarCompras || mostrarVentas ? cerrarTablas() : navigate("/")} />
                        </div>
                    </div>

            }

            {/* <Month mes={String(mesActual)} /> */}
        </div >
    )


}