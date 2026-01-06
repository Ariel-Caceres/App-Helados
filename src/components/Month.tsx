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
        productoAFitrar: string
        setVentaAEditar: (v: Venta | undefined) => void
        setModalEliminar: () => void
        setTransaccion: (v: Venta | undefined) => void
    }
    | {
        tipo: "compra";
        mes: string
        productoAFitrar: string
        setCompraAEditar: (c: Compra) => void
        setModalEliminarCompra: () => void
        setCompraAEliminar: (c: Compra) => void
    }


export const Month = (props: AccionesProps) => {
    const { ventas, hoy } = useSell()
    const { compras } = useBuy()
    const { online } = useOnline()
    const mes = props.mes.padStart(2, "0")

    const [dataAMostrar, setDataAMostrar] = useState<Venta[] | Compra[]>()
    const [dataDb, setDataDb] = useState<Venta[]>()
    const [mesFiltro, setMesFiltro] = useState<string>("")
    const [cargando, setCargando] = useState<boolean>(false)

    const [totalHeladoCantidad, setTotalHeladoCantidad] = useState<number>()
    const [totalHeladoPrecio, setTotalHeladoPrecio] = useState<number>()
    const [PTTotalCantidad, setPTTotalCantidad] = useState<number>()
    const [PTTotalPrecio, setPTTotalPrecio] = useState<number>()
    const [CPTotalCantidad, setCPTotalCantidad] = useState<number>()
    const [CPTotalPrecio, setCPTotalPrecio] = useState<number>()

    const calcularTotal = () => {
        if (dataAMostrar && !cargando) {
            const ventasHelado = dataAMostrar.filter(v =>
                v.producto == "helado" || v.producto == undefined
            )

            const HTotalCantidad = ventasHelado.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const HTotalPrecio = ventasHelado.reduce((acc, v) => v.status != "pending-delete" ? v.precioTotal ? acc + v.precioTotal : acc + v.precio : acc, 0)
            setTotalHeladoCantidad(HTotalCantidad)
            setTotalHeladoPrecio(HTotalPrecio)
        }
        if (dataAMostrar && !cargando) {
            const ventasPT = dataAMostrar.filter(v =>
                v.producto == "pollo-trozado"
            )
            const PTTotalCantidad = ventasPT.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const PTTotalPrecio = ventasPT.reduce((acc, v) => v.status != "pending-delete" ? v.precioTotal ? acc + v.precioTotal : acc + v.precio : acc, 0)
            setPTTotalCantidad(PTTotalCantidad)
            setPTTotalPrecio(PTTotalPrecio)
        }
        if (dataAMostrar && !cargando) {
            const ventasCP = dataAMostrar.filter(v =>
                v.producto == "carne-picada"
            )
            const CPTotalCantidad = ventasCP.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const CPTotalPrecio = ventasCP.reduce((acc, v) => v.status != "pending-delete" ? v.precioTotal ? acc + v.precioTotal : acc + v.precio : acc, 0)
            setCPTotalCantidad(CPTotalCantidad)
            setCPTotalPrecio(CPTotalPrecio)
        }
    }

    const noralizadorProductos: Record<string, () => string> = {
        "pollo-trozado": () => "Pollo Trozado",
        "carne-picada": () => "Carne Picada",
        "helado": () => "Helado",
    }

    useEffect(() => {
        calcularTotal()
    }, [props.tipo, dataAMostrar])

    useEffect(() => {
        setMesFiltro(mes)
    }, [props.tipo, mes])

    useEffect(() => {
        if (!mesFiltro || !online) return

        const traerDataDb = async (mes: string) => {
            const url = props.tipo == "venta"
                ? `${import.meta.env.VITE_API_URL}/sales/month/${mes}`
                : `${import.meta.env.VITE_API_URL}/purchases/month/${mes}`
            try {
                setCargando(true)
                const res = await fetch(url)
                if (!res.ok) {
                    console.log("Error al traer los productos de la base de datos")
                } else {
                    console.log("Fetch exitoso")
                    const data = await res.json()
                    setDataDb(data)
                }
                setCargando(false)
            } catch (e) {
                console.log("Error al traer los productos de la base de datos", e)
            }
        }

        traerDataDb(mesFiltro)

    }, [mesFiltro, props.tipo, online])

    useEffect(() => {
        if (hoy.split("-")[1] == mes && !online) {
            if (props.tipo == "venta") {
                const ventasFiltradas = ventas.filter(v =>
                    v.status !== "pending-delete" &&
                    (v.fecha.split("-")[1]) === mes &&
                    (
                        props.productoAFitrar === "todos" ||
                        v.producto === props.productoAFitrar
                    )
                )

                setDataAMostrar(ventasFiltradas)
                return
            }
            if (props.tipo == "compra") {
                const comprasFiltradas = compras.filter(c => {
                    if (c.status === "pending-delete") return false
                    if (c.fecha.split("-")[1] !== mes) return false

                    if (props.productoAFitrar === "todos") return true

                    return c.producto === props.productoAFitrar
                })
                console.log(comprasFiltradas);

                setDataAMostrar(comprasFiltradas)

            }
            return
        } else {
            if (dataDb && props.productoAFitrar) {
                const dataFiltrada = dataDb.filter(d => {
                    if (props.productoAFitrar === "todos") return true

                    if (props.productoAFitrar === "helado") {
                        return d.producto === "helado" || d.producto === undefined
                    }

                    return d.producto === props.productoAFitrar
                })
                if (props.tipo == "venta") {
                    setDataAMostrar(dataFiltrada as Venta[])
                }
                if (props.tipo == "compra") {
                    setDataAMostrar(dataFiltrada as Compra[])
                }
            }
        }
    }, [dataDb, ventas, props.productoAFitrar, props.tipo, compras, mes, online, hoy])

    console.log();


    if (cargando) return <div className="flex justify-center items-center border-2 text-xl mt-2 mb-5 p-2 ">Cargando...<span className=" animate-spin">🕐</span></div>
    return (
        <div className="mb-5">
            {props.tipo == "venta" &&
                (dataAMostrar && dataAMostrar.length != 0 ?
                    <div className="">
                        <HeaderTabla />

                        {dataAMostrar && dataAMostrar.map((v, i) => (
                            <div className={`flex justify-between min-h-12`} key={i}>

                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center  ">
                                    <span>{v.fecha}</span>
                                </div>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                    <span>{v.producto ? noralizadorProductos[v.producto]() : "Helado"}</span>
                                </div>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                    <span>{v.cantidad} {v.producto ? v.producto == "helado" ? "ud" : "kg" : "ud"}</span>
                                </div>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                    <span>${v.precioTotal}</span>
                                </div>

                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
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
                        <div className="w-full gap-2 justify-center items-center justify-self-center flex mt-2 flex-col mb-2">
                            <div className="w-3/5 flex items-center justify-center text-xl border-2 ">
                                <span>Totales</span>
                            </div>
                            {(props.productoAFitrar == "todos" || props.productoAFitrar == "helado") &&
                                <div className={`w-full flex  justify-center`}>
                                    <div className="w-1/5 border-2 border-gray-600 justify-start flex border-r-0 text-start">
                                        <span>Helado =</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0 text-start ">
                                        <span>{totalHeladoCantidad} uds</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex">
                                        <span>${totalHeladoPrecio}</span>
                                    </div>
                                </div>
                            }
                            {(props.productoAFitrar == "todos" || props.productoAFitrar == "carne-picada") &&
                                <div className={`w-full flex  justify-center`}>
                                    <div className="w-1/5 border-2 border-gray-600 justify-start flex border-r-0">
                                        <span>Carne Picada =</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0">
                                        <span>{CPTotalCantidad} kgs</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex">
                                        <span>${CPTotalPrecio}</span>
                                    </div>
                                </div>
                            }
                            {(props.productoAFitrar == "todos" || props.productoAFitrar == "pollo-trozado") &&

                                <div className={`w-full flex  justify-center`}>
                                    <div className="w-1/5 border-2 border-gray-600 justify-start flex border-r-0 ">
                                        <span>Pollo Trozado =</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0">
                                        <span>{PTTotalCantidad} kgs</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex">
                                        <span>${PTTotalPrecio}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    :
                    <div className="w-full flex justify-center border-2 mt-2 p-2">
                        <span className="text-xl">
                            No hay ventas este mes / No hay internet 😿
                        </span>
                    </div>)
            }


            {props.tipo == "compra" &&
                (dataAMostrar && dataAMostrar.length != 0 ?
                    <div>
                        <HeaderTabla />
                        {dataAMostrar.map((c, i) => (
                            <div className="flex justify-between min-h-12 " key={i}>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center  ">
                                    <span>{c.fecha}</span>
                                </div>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                    <span>{c.producto ? noralizadorProductos[c.producto]() : "Helado"}</span>
                                </div>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                    <span>{c.cantidad} {c.producto ? c.producto == "helado" ? "uds" : "kgs" : "uds"}</span>
                                </div>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
                                    <span>${c.precio}</span>
                                </div>
                                <div className="flex justify-center w-1/5 border-gray-300 border-2 items-center ">
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

                        <div className="w-full gap-2 justify-center items-center justify-self-center flex mt-2 flex-col mb-2">
                            <div className="w-3/5 flex items-center justify-center text-xl border-2 ">
                                <span>Totales</span>
                            </div>
                            {(props.productoAFitrar == "todos" || props.productoAFitrar == "helado") &&
                                <div className={`w-full flex  justify-center`}>
                                    <div className="w-1/5 border-2 border-gray-600 justify-start flex border-r-0 text-start">
                                        <span>Helado =</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0 text-start ">
                                        <span>{totalHeladoCantidad} uds</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex">
                                        <span>${totalHeladoPrecio}</span>
                                    </div>
                                </div>
                            }
                            {(props.productoAFitrar == "todos" || props.productoAFitrar == "carne-picada") &&
                                <div className={`w-full flex  justify-center`}>
                                    <div className="w-1/5 border-2 border-gray-600 justify-start flex border-r-0">
                                        <span>Carne Picada =</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0">
                                        <span>{CPTotalCantidad} kgs</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex">
                                        <span>${CPTotalPrecio}</span>
                                    </div>
                                </div>
                            }
                            {(props.productoAFitrar == "todos" || props.productoAFitrar == "pollo-trozado") &&

                                <div className={`w-full flex  justify-center`}>
                                    <div className="w-1/5 border-2 border-gray-600 justify-start flex border-r-0 ">
                                        <span>Pollo Trozado =</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex border-r-0">
                                        <span>{PTTotalCantidad} kgs</span>
                                    </div>
                                    <div className="w-1/5 border-2 border-gray-600 justify-center flex">
                                        <span>${PTTotalPrecio}</span>
                                    </div>
                                </div>
                            }
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