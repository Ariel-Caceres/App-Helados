import { useEffect, useMemo, useState } from "react"
import type { Compra } from "../types/compra.entity"
import { Header } from "../components/Header"
import { useSalesDb } from "../hooks/useSalesDb"
import { usePurchases } from "../hooks/usePurchasesDb"
import { HeaderTabla } from "../components/HeaderTabla"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom";
import { useSell } from "../hooks/useSell"
import type { Producto } from "../context/SellContext"


export const LoteResume = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { ventasDb, cargando } = useSalesDb()
    const { precios } = useSell()
    const { comprasDb } = usePurchases()
    const [ultimaCompra, setUltimaCompra] = useState<Compra>()
    const navigate = useNavigate()
    const [totalHeladoCantidad, setTotalHeladoCantidad] = useState<number>()
    const [totalHeladoPrecio, setTotalHeladoPrecio] = useState<number>()
    const [PTTotalCantidad, setPTTotalCantidad] = useState<number>()
    const [PTTotalPrecio, setPTTotalPrecio] = useState<number>()
    const [CPTotalCantidad, setCPTotalCantidad] = useState<number>()
    const [CPTotalPrecio, setCPTotalPrecio] = useState<number>()
    const [compraUnidad, setCompraUnidad] = useState<number>()
    const [mpd, setmpd] = useState(Number(searchParams.get("categoria")) || 1)
    const [gciaTotal, setGciaTotal] = useState<number>()
    const [gciaUnidad, setGciaUnidad] = useState<number>()
    const [margen, setMargen] = useState<number>()
    const productos: Record<string, () => Producto> = {
        1: () => "helado",
        2: () => "carne-picada",
        3: () => "pollo-trozado"
    }
    useMemo(() => {
        if (comprasDb) {
            const ultimaCompra: Compra = comprasDb.filter(c => c.producto == productos[mpd]())
                .sort((a, b) => Number(b.fecha.split("-")[2]) - Number(a.fecha.split("-")[2]))[0]
            setUltimaCompra(ultimaCompra)
        }
    }, [comprasDb, mpd])

    const ventasAMostrar = ventasDb?.filter(v => v.producto == productos[mpd]() &&
        Number(v.fecha.split("-")[2]) >= Number(ultimaCompra?.fecha.split("-")[2]))
        .sort((a, b) => Number(a.fecha.split("-")[2]) - Number(b.fecha.split("-")[2]))

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

    useMemo(() => {
        if (ultimaCompra) {
            const compraUnidad = ultimaCompra.precio / ultimaCompra.cantidad
            setCompraUnidad(compraUnidad)
            const gciaTotal = ultimaCompra.cantidad * precios[productos[mpd]()]
            setGciaTotal(gciaTotal)
            const gciaUnidad = precios[productos[mpd]()] - compraUnidad
            setGciaUnidad(gciaUnidad)
            const margen = (gciaUnidad / precios[productos[mpd]()]) * 100
            setMargen(margen)
        }
    }, [ultimaCompra, mpd])

    useEffect(() => {
        setSearchParams({
            categoria: String(mpd)
        })
        calcularTotal()
    }, [cargando, mpd])



    return (
        <div className="w-full  max-w-3xl mx-auto  flex mt-[5vh]  flex-col gap-5 px-2 overflow-hidden ">
            <Header />
            <div className="flex  flex-col md:flex-row justify-center gap-4 mt-2 px-2 max-h-[30vh] overflow-auto ">
                <div className="flex flex-col w-full min-w-xl " >

                    <HeaderTabla tipo="lote" />
                    <div className={`flex justify-between min-h-12`} >
                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center  ">
                            <span>{ultimaCompra?.fecha}</span>
                        </div>

                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                            <span>{ultimaCompra?.cantidad}</span>
                        </div>
                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                            <span>${ultimaCompra?.precio}</span>
                        </div>
                        <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                            <span>Compra</span>
                        </div>
                    </div>
                    {ventasAMostrar?.map((v, i) =>
                        <div className={`flex justify-between min-h-12`} key={i} >
                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center  ">
                                <span>{v?.fecha}</span>
                            </div>

                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                <span>{v?.cantidad}</span>
                            </div>
                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                <span>${v?.precioTotal}</span>
                            </div>
                            <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                                <span>Venta</span>
                            </div>
                        </div>
                    )}

                </div>


            </div>

            <div className="w-full gap-2 justify-evenly items-center justify-self-center flex mt-2 flex-col mb-2">

                <div className={`sm:w-[80%] w-full flex  justify-center  `}>
                    <div className=" w-1/4 border-2 border-gray-600 justify-start flex border-r-0 text-start">
                        <span>Compra =</span>
                    </div>
                    <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0 text-start ">
                        <span>{ultimaCompra?.cantidad} {ultimaCompra?.producto == "helado" ? "uds" : "kgs"}</span>
                    </div>
                    <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                        <span>${ultimaCompra?.precio}</span>
                    </div>

                    <div className="w-1/4 border-2 border-gray-600 justify-center flex border-l-0 text-start">

                        <span className="pr-1">1 {ultimaCompra?.producto == "helado" ? "ud" : "kg"} x  </span>
                        <span> ${compraUnidad}</span>
                    </div>

                </div>

                {productos[mpd]() == "helado" &&
                    <div className={`sm:w-[80%] w-full flex  justify-center`}>
                        <div className="w-1/4 border-2 border-gray-600 justify-start flex border-r-0 text-start">
                            <span>Venta =</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0 text-start ">
                            <span>{totalHeladoCantidad} uds</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                            <span>${totalHeladoPrecio}</span>
                        </div>

                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-l-0 text-start">

                            <span className="pr-1">1 {ultimaCompra?.producto == "helado" ? "ud" : "kg"} x  </span>
                            <span> ${precios["helado"]}</span>
                        </div>
                    </div>
                }
                {productos[mpd]() == "carne-picada" &&
                    <div className={`sm:w-[80%] w-full flex  justify-center`}>
                        <div className="w-1/4 border-2 border-gray-600 justify-start flex border-r-0">
                            <span>Venta =</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                            <span>{CPTotalCantidad} kgs</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                            <span>${CPTotalPrecio}</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-l-0 text-start">

                            <span className="pr-1">1 {ultimaCompra?.producto == "helado" ? "ud" : "kg"} x  </span>
                            <span> ${precios["carne-picada"]}</span>
                        </div>
                    </div>
                }
                {productos[mpd]() == "pollo-trozado" &&
                    <div className={`sm:w-[80%] w-full flex  justify-center`}>
                        <div className="w-1/4 border-2 border-gray-600 justify-start flex border-r-0 ">
                            <span>Venta =</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-r-0">
                            <span>{PTTotalCantidad} kgs</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                            <span>${PTTotalPrecio}</span>
                        </div>
                        <div className="w-1/4 border-2 border-gray-600 justify-center flex border-l-0 text-start">
                            <span className="pr-1">1 {ultimaCompra?.producto == "helado" ? "ud" : "kg"} x  </span>
                            <span> ${precios["pollo-trozado"]}</span>
                        </div>
                    </div>
                }

                <div className={`sm:w-[80%] w-full flex  justify-center`}>
                    <div className="w-1/4 border-2 border-r-0 border-gray-600 justify-start flex">
                        <span>Ganancia =</span>
                    </div>
                    <div className=" w-1/4 border-2 border-gray-600 justify-center flex border-r-0 ">
                        <span>Total= </span>
                        <span>${gciaTotal}</span>
                    </div>
                    <div className="w-1/4 border-2 border-gray-600 justify-center flex">
                        <span>Ud=</span>
                        <span>${gciaUnidad}</span>
                    </div>

                    <div className="w-1/4 border-2 border-gray-600 justify-center flex border-l-0">

                        <span className="pr-1">Margen  </span>
                        {margen &&
                            <span>{Math.round(margen)}%</span>
                        }
                    </div>

                </div>

            </div>

            <div className={`flex w-full justify-center text-2xl p-4 text-center items-center`}>
                <div className="w-80 sm:w-2/3 flex justify-center items-center">
                    <div className=" border-2 rounded-2xl " onClick={() => setmpd(mpd > 1 ? mpd - 1 : 3)}>
                        <span ><i className="fa-solid fa-angle-left p-2"></i></span>
                    </div>
                    <div className={`w-2/3 font-bold }`}>
                        <span>{productos[mpd]() == "helado" ? "Helado" : productos[mpd]() == "pollo-trozado" ? "Pollo Trozado" : productos[mpd]() == "carne-picada" ? "Carne Picada" : ""}</span>
                    </div>
                    <div className="border-2 rounded-2xl" onClick={() => setmpd(mpd < 3 ? mpd + 1 : 1)}>
                        <span ><i className="fa-solid fa-angle-right p-2"></i></span>
                    </div>
                </div>
            </div>


            <div
                className=" w-[98%] flex flex-col-reverse justify-center items-center gap-4 absolute bottom-[5vh] sm:static mt-50 sm:flex-row sm:gap-10 sm:justify-evenly "        >
                <Button texto="Volver" tipo="button" onClick={() => navigate("/")} />
            </div>

        </div >
    )
}