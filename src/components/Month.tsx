import { useOnline } from "../context/useOnline"
import { useSell } from "../context/useSell"
import type { Venta } from "../types/venta.entity"
import { HeaderTabla } from "../components/HeaderTabla"
import type { Compra } from "../types/compra.entity";
import { useBuy } from "../context/useBuy";
import { useEffect, useState } from "react";


type AccionesProps =
    | {
        tipo: "venta";
        mes: string
        setVentaAEditar: (v: Venta | undefined) => void
        setModalEliminar: () => void
        setTransaccion: (v: Venta | undefined) => void
    }
    | {
        tipo: "compra";
        mes: string
        setCompraAEditar: (c: Compra) => void
        setModalEliminarCompra: () => void
        setCompraAEliminar: (c: Compra) => void
    }


export const Month = (props: AccionesProps) => {
    const { ventas, hoy } = useSell()
    const { compras } = useBuy()
    const online = useOnline()
    const [ventasAMostrar, setVentaAMostrar] = useState<Venta[]>()

    const ventasMes = ventasAMostrar?.filter(v => v.fecha.split("-")[1] === props.mes.padStart(2, "0") && v.status !== "pending-delete")
    const comprasMes = compras.filter(c => c.fecha.split("-")[1] === props.mes.padStart(2, "0") && c.status !== "pending-delete")

    const ventasTotalDinero = ventasMes?.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.precioTotal : acc, 0)
    const ventasTotalCantidad = ventasMes?.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.cantidad : acc, 0)
    const comprasTotalDinero = comprasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.precio : acc, 0)
    const comprasTotalCantidad = comprasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.cantidad : acc, 0)
    const [ventasDb, setVentasDb] = useState<Venta[]>()
    const [mesFiltro, setMesFiltro] = useState<string>("")
    const [cargando, setCargando] = useState<boolean>(false)

    useEffect(() => {
        setMesFiltro(props.mes.padStart(2, "0"))
    }, [props.tipo, props.mes])

    useEffect(() => {
        if (!mesFiltro) return
        const traerVentasDb = async (mes: string) => {
            try {
                setCargando(true)
                console.log(cargando)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/sales/month/${mes}`)
                if (!res.ok) {
                    console.log("Error al traer los productos de la base de datos")
                } else {
                    console.log("Fetch exitoso")
                    const data = await res.json()
                    setVentasDb(data)
                }
                setCargando(false)
            } catch (e) {
                console.log("Error al traer los productos de la base de datos", e)
            }
        }
        traerVentasDb(mesFiltro)

    }, [mesFiltro])


    useEffect(() => {
        if (hoy.split("-")[1] == props.mes.padStart(2, "0") && !online) {
            const ventasSinPd = ventas.filter(v =>
                v.status != "pending-delete" && v.fecha.split("-")[1] == props.mes.padStart(2, "0")
            )
            setVentaAMostrar(ventasSinPd)
            return
        } else {
            setVentaAMostrar(ventasDb)
        }
    }, [ventasDb, ventas])


    console.log(ventasAMostrar);

    if (cargando) return <div className="flex justify-center items-center border-2 text-xl mt-2 mb-5 p-2 ">Cargando...<span className=" animate-spin">🕐</span></div>
    return (
        <div className="mb-5">
            {props.tipo == "venta" &&
                (ventasAMostrar && ventasAMostrar.length != 0 ?
                    <div>
                        <HeaderTabla />

                        {ventasAMostrar && ventasAMostrar.map((v, i) => (
                            <div className={`flex justify-between min-h-12`} key={i}>

                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center  ">
                                    <span>{v.fecha}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>{v.producto ? v.producto : "Helado"}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>{v.cantidad}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>${v.precioTotal}</span>
                                </div>

                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <button className="bg-[#87F6FF] w-1/2 h-full border rounded-md" onClick={() => props.setVentaAEditar(v)}>
                                        <span className="text-2xl">
                                            {online ? <i className="fa-regular fa-pen-to-square"></i> : "✏"}
                                        </span>
                                    </button>
                                    <button className="bg-[#FFBFA0] w-1/2 h-full border rounded-md" onClick={() => { props.setModalEliminar(); props.setTransaccion(v) }}>
                                        <span className="text-2xl">
                                            {online ? <i className="fa-regular fa-trash-can "></i> : "🗑"}
                                        </span>
                                    </button>

                                </div>
                            </div>))
                        }

                        <div className={`w-full flex  justify-start`}>
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
                    </div>
                    :
                    <div className="w-full flex justify-center border-2 mt-2 p-2">
                        <span className="text-xl">
                            No hay ventas este mes 😿
                        </span>
                    </div>)

            }


            {props.tipo == "compra" &&
                (comprasMes.length != 0 ?
                    <div>
                        <HeaderTabla />
                        {comprasMes.map((c, i) => (
                            <div className="flex justify-between min-h-12 " key={i}>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center  ">
                                    <span>{c.fecha}</span>
                                </div>

                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>{c.cantidad}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <span>${c.precio}</span>
                                </div>
                                <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                    <button className="bg-[#87F6FF] w-1/2 h-full border rounded-md" onClick={() => props.setCompraAEditar(c)}>
                                        <span className="text-2xl">
                                            {online ? <i className="fa-regular fa-pen-to-square"></i> : "✏"}
                                        </span>
                                    </button>
                                    <button className="bg-[#FFBFA0] w-1/2 h-full border rounded-md" onClick={() => { props.setModalEliminarCompra(); props.setCompraAEliminar(c) }}>
                                        <span className="text-2xl">
                                            {online ? <i className="fa-regular fa-trash-can "></i> : "🗑"}
                                        </span>
                                    </button>

                                </div>
                            </div>))}
                        <div className="w-full flex  justify-start">
                            <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                                <span>Total =</span>
                            </div>
                            <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                                <span>{comprasTotalCantidad
                                }</span>
                            </div>
                            <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                                <span>${comprasTotalDinero}</span>
                            </div>
                        </div>
                    </div> :
                    <div className="w-full flex justify-center border-2 mt-2 p-2">
                        <span className="text-xl">
                            No hay compras este mes 😿
                        </span>
                    </div>)
            }
        </div>
    )
}