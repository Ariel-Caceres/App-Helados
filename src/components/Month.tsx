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
type productoAFiltrar = "todos" | "helado" | "pollo-trozado" | "carne-picada"

export const Month = (props: AccionesProps) => {
    const { ventas, hoy } = useSell()
    const { compras } = useBuy()
    const { online } = useOnline()
    const mes = props.mes.padStart(2, "0")

    const [ventasAMostrar, setVentasAMostrar] = useState<Venta[]>()
    const [comprasAMostrar, setComprasAMostrar] = useState<Compra[]>()
    const [dataDb, setDataDb] = useState<Venta[] | Compra[]>()
    const [mesFiltro, setMesFiltro] = useState<string>("")
    const [cargando, setCargando] = useState<boolean>(false)

    const [totalHeladoCantidad, setTotalHeladoCantidad] = useState<number>()
    const [totalHeladoPrecio, setTotalHeladoPrecio] = useState<number>()
    const [PTTotalCantidad, setPTTotalCantidad] = useState<number>()
    const [PTTotalPrecio, setPTTotalPrecio] = useState<number>()
    const [CPTotalCantidad, setCPTotalCantidad] = useState<number>()
    const [CPTotalPrecio, setCPTotalPrecio] = useState<number>()

    const [productoAFiltrar, setProductoAFiltrar] = useState<productoAFiltrar>("todos")

    const calcularTotal = () => {
        if (ventasAMostrar && !cargando) {
            const ventasHelado = ventasAMostrar.filter(v =>
                v.producto == "helado" || v.producto == undefined
            )

            const HTotalCantidad = ventasHelado.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const HTotalPrecio = ventasHelado.reduce((acc, v) => v.status != "pending-delete" ? v.precioTotal ? acc + v.precioTotal : acc + v.precio : acc, 0)
            setTotalHeladoCantidad(HTotalCantidad)
            setTotalHeladoPrecio(HTotalPrecio)
        }
        if (ventasAMostrar && !cargando) {
            const ventasPT = ventasAMostrar.filter(v =>
                v.producto == "pollo-trozado"
            )
            const PTTotalCantidad = ventasPT.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const PTTotalPrecio = ventasPT.reduce((acc, v) => v.status != "pending-delete" ? v.precioTotal ? acc + v.precioTotal : acc + v.precio : acc, 0)
            setPTTotalCantidad(PTTotalCantidad)
            setPTTotalPrecio(PTTotalPrecio)
        }
        if (ventasAMostrar && !cargando) {
            const ventasCP = ventasAMostrar.filter(v =>
                v.producto == "carne-picada"
            )
            const CPTotalCantidad = ventasCP.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const CPTotalPrecio = ventasCP.reduce((acc, v) => v.status != "pending-delete" ? v.precioTotal ? acc + v.precioTotal : acc + v.precio : acc, 0)
            setCPTotalCantidad(CPTotalCantidad)
            setCPTotalPrecio(CPTotalPrecio)
        }
    }
    const calcularTotalCompras = () => {
        if (comprasAMostrar && !cargando) {
            const ventasHelado = comprasAMostrar.filter(v =>
                v.producto == "helado" || v.producto == undefined
            )

            const HTotalCantidad = ventasHelado.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const HTotalPrecio = ventasHelado.reduce((acc, v) => v.status != "pending-delete" ? acc + v.precio : acc, 0)
            setTotalHeladoCantidad(HTotalCantidad)
            setTotalHeladoPrecio(HTotalPrecio)
        }
        if (comprasAMostrar && !cargando) {
            const ventasPT = comprasAMostrar.filter(v =>
                v.producto == "pollo-trozado"
            )
            const PTTotalCantidad = ventasPT.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const PTTotalPrecio = ventasPT.reduce((acc, v) => v.status != "pending-delete" ? acc + v.precio : acc, 0)
            setPTTotalCantidad(PTTotalCantidad)
            setPTTotalPrecio(PTTotalPrecio)
        }
        if (comprasAMostrar && !cargando) {
            const ventasCP = comprasAMostrar.filter(v =>
                v.producto == "carne-picada"
            )
            const CPTotalCantidad = ventasCP.reduce((acc, v) => v.status != "pending-delete" ? acc + v.cantidad : acc, 0)
            const CPTotalPrecio = ventasCP.reduce((acc, v) => v.status != "pending-delete" ? acc + v.precio : acc, 0)
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
        calcularTotalCompras()
    }, [props.tipo, ventasAMostrar, comprasAMostrar])

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
                        productoAFiltrar === "todos" ||
                        v.producto === productoAFiltrar
                    )
                )


                setVentasAMostrar(ventasFiltradas)
                return
            }
            if (props.tipo == "compra") {
                const comprasFiltradas = compras.filter(c => {
                    if (c.status === "pending-delete") return false
                    if (c.fecha.split("-")[1] !== mes) return false

                    if (productoAFiltrar === "todos") return true

                    return c.producto === productoAFiltrar
                })

                setComprasAMostrar(comprasFiltradas)

            }
            return
        } else {
            if (dataDb && productoAFiltrar) {
                const dataFiltrada = dataDb.filter(d => {
                    if (productoAFiltrar === "todos") return true

                    if (productoAFiltrar === "helado") {
                        return d.producto === "helado" || d.producto === undefined
                    }

                    return d.producto === productoAFiltrar
                })
                if (props.tipo == "venta") {
                    const ventasOrdenadas = dataFiltrada.sort((a, b) => Number(a.fecha.split("-")[2]) - Number(b.fecha.split("-")[2]))
                    console.log(ventasOrdenadas);
                    setVentasAMostrar(dataFiltrada as Venta[])
                }
                if (props.tipo == "compra") {
                    setCargando(true)
                    setComprasAMostrar(dataFiltrada as Compra[])
                    setCargando(false)
                }
            }
        }
    }, [dataDb, ventas, productoAFiltrar, props.tipo, compras, mes, online, hoy])



    if (cargando) return <div className="flex justify-center items-center border-2 text-xl mt-2 mb-5 p-2 ">Cargando...<span className=" animate-spin">🕐</span></div>
    return (
        <>
            <div className="mb-5 relative">
                {props.tipo == "venta" &&
                    (ventasAMostrar && ventasAMostrar.length != 0 ?
                        <div className="">
                            <HeaderTabla />

                            {ventasAMostrar && ventasAMostrar.map((v, i) => (
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
                                {(productoAFiltrar == "todos" || productoAFiltrar == "helado") &&
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
                                {(productoAFiltrar == "todos" || productoAFiltrar == "carne-picada") &&
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
                                {(productoAFiltrar == "todos" || productoAFiltrar == "pollo-trozado") &&

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
                    (comprasAMostrar && comprasAMostrar.length != 0 ?
                        <div>
                            <HeaderTabla />
                            {comprasAMostrar.map((c, i) => (
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
                                {(productoAFiltrar == "todos" || productoAFiltrar == "helado") &&
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
                                {(productoAFiltrar == "todos" || productoAFiltrar == "carne-picada") &&
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
                                {(productoAFiltrar == "todos" || productoAFiltrar == "pollo-trozado") &&

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
            <div className="w-[98%] items-center  flex justify-center absolute  sm:mb-5  bottom-[-10vh]">
                <div className="relative w-44 sm:w-1/4 border-2 rounded-xl  flex justify-center items-center text-md">
                    <i className={`fa-solid fa-filter absolute left-3 text-xl `}></i>
                    <select name="select" id="select" className=" text-center appearance-none p-2  focus:animate-pulse h-full outline-0 w-full"
                        onChange={(e) => setProductoAFiltrar(e.target.value as productoAFiltrar)}
                    >
                        <option value="todos" className="p-2">Todos</option>
                        <option value="helado" className="p-2">Helados</option>
                        <option value="carne-picada" className="p-2">Carne Picada</option>
                        <option value="pollo-trozado" className="p-9 flex">Pollo Trozado</option>
                    </select>
                </div>
            </div>
        </>

    )
}