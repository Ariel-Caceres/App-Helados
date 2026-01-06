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
import type { Venta } from "../types/venta.entity"
import type { Compra } from "../types/compra.entity"

export const Record = () => {
    const { ventas, setVentas, hoy } = useSell()
    const { compras, setCompras } = useBuy()
    const navigate = useNavigate()
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
    const [compraAEliminar, setCompraAEliminar] = useState<Compra>()
    const [mesActual, setMesActual] = useState(Number(hoy.split("-")[1]))


    const eliminarTransaccion = (transaccion: Venta) => {
        if (transaccion.status == "pending-create") {
            const ventaLocalDelete = ventas.filter(v =>
                v.id !== transaccion.id
            )
            setVentas(ventaLocalDelete)
            return
        } else {
            const transBorrado = ventas.map(v =>
                v.id == transaccion.id ?
                    {
                        ...v,
                        status: "pending-delete"
                    } as Venta
                    : v
            )
            setVentas(transBorrado)
        }

    }

    const eliminarCompra = (compra: Compra) => {
        if (compra.status == "pending-create") {
            const compraLocal = compras.filter(c => c.id != compra.id)
            setCompras(compraLocal)
            return
        }
        else {
            const compraBorrada = compras.map(c =>
                c.id == compra.id ?
                    { ...c, status: "pending-delete" } as Compra :
                    c
            )
            setCompras(compraBorrada)
        }
    }

    const mesActualConverter: Record<string, () => string> = {
        "01": () => "ENE",
        "02": () => "FEB",
        "03": () => "MAR",
        "04": () => "ABR",
        "05": () => "MAY",
        "06": () => "JUN",
        "07": () => "JUL",
        "08": () => "AGO",
        "09": () => "SEP",
        "10": () => "OCT",
        "11": () => "NOV",
        "12": () => "DIC"
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
                        <div className={`w-full border-l border-r border-b rounded-2xl flex flex-col  relative  mb-10`}>

                            <div className="border  gap-y-3  right-0 flex  w-full justify-between items-center md:justify-between sm:justify-between    bg-amber-200 rounded-2xl px-6 py-2 ">
                                <div className="text-md whitespace-nowrap md:text-xl sm:text-md xl:text-3xl font-medium ">
                                    {online ? <i className="fa-regular fa-calendar-days py-3"></i> : "📆"}
                                    <span className=""> Historial:</span>
                                    {mostrarCompras ? " Compras" : mostrarVentas ? " Ventas" : ""}
                                </div>

                                {(mostrarCompras || mostrarVentas) &&
                                    <div className="flex justify-center items-center md:text-xl xl:text-3xl  text-xl gap-4">
                                        <div className="flex justify-center items-center shrink-0">
                                            <span>{mesActualConverter[String(mesActual).padStart(2, "0")]()}</span>
                                        </div>
                                        <div className="gap-2 flex shrink-0 ">
                                            <div className=" flex p-2 border justify-center items-center rounded-2xl" onClick={() => { setMesActual(mesActual < 12 ? Number(mesActual) + 1 : 12) }}>
                                                <i className="fa-solid fa-angle-up " ></i>
                                            </div>
                                            <div className="flex p-2 border justify-center items-center rounded-2xl" onClick={() => { setMesActual(mesActual > 1 ? Number(mesActual) - 1 : 1) }}>
                                                <i className="fa-solid fa-angle-down" ></i>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>

                            {!mostrarCompras && !mostrarVentas &&
                                <div className="mt-10 mb-10 w-full justify-center flex items-center gap-5 max-h-[30vh] flex-wrap">
                                    <button className="p-5 bg-[#FFBFA0] rounded-2xl border-2 text-xl cursor-pointer font-medium sm:w-2/3 md:w-1/3 w-4/5"
                                        onClick={() => { setMostrarVentas(false); setMostrarCompras(true) }
                                        }>Compras</button>
                                    <button className="p-5 bg-[#87F6FF] rounded-2xl border-2 text-xl cursor-pointer font-medium sm:w-2/3 md:w-1/3 w-4/5 "
                                        onClick={() => { setMostrarVentas(true); setMostrarCompras(false) }
                                        }>Ventas</button>
                                </div>
                            }

                            {mostrarVentas &&
                                <div className="flex flex-col md:flex-row justify-evenly gap-4 mt-2 px-2 max-h-[30vh] overflow-auto ">
                                    <div className="flex flex-col w-full min-w-xl " >
                                        {mostrarModalEliminar && transaccion ?
                                            <ModalDelete
                                                tipo="venta"
                                                transaccion={transaccion}
                                                eliminarTransaccion={() => eliminarTransaccion(transaccion)}
                                                setModalEliminar={(v) => setModalEliminar(v)}
                                            />
                                            :
                                            <Month tipo="venta" mes={String(mesActual)} setModalEliminar={() => setModalEliminar(true)} setTransaccion={setTransaccion} setVentaAEditar={setVentaAEditar} />
                                        }
                                    </div>
                                </div>
                            }

                            {mostrarCompras &&
                                <div className="flex flex-col md:flex-row justify-evenly gap-4 mt-2 px-2 max-h-[30vh] overflow-auto ">
                                    <div className="flex flex-col w-full min-w-xl " >
                                        {mostrarModalEliminarCompra && compraAEliminar ?
                                            <ModalDelete
                                                tipo="compra"
                                                compraAEliminar={compraAEliminar}
                                                eliminarCompra={() => eliminarCompra(compraAEliminar)}
                                                setModalEliminarCompra={(v) => setModalEliminarCompra(v)}
                                            />
                                            :
                                            <Month tipo="compra" mes={String(mesActual)} setCompraAEliminar={setCompraAEliminar} setModalEliminarCompra={() => setModalEliminarCompra(true)} setCompraAEditar={setCompraAEditar} />
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                        <div
                            className=" w-[98%] flex flex-col-reverse justify-center items-center gap-4 absolute bottom-[5vh] sm:static sm:flex-row sm:gap-10 sm:justify-evenly "        >
                            <Button texto="Volver" tipo="button" onClick={() => mostrarCompras || mostrarVentas ? cerrarTablas() : navigate("/")} />
                        </div>
                    </div>
            }

        </div >
    )


}