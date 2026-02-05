import { useSell } from "../hooks/useSell"
import { useBuy } from "../hooks/useBuy"
import { useOnline } from "../hooks/useOnline"
import { useEffect, useState } from "react"
import { useSalesDb } from "../hooks/useSalesDb"
import { usePurchases } from "../hooks/usePurchasesDb"
import { useNavigate, useSearchParams } from "react-router-dom";

export const MonthResume = ({ producto, animar }: { producto: string, animar: boolean }) => {
    const navigate = useNavigate()
    const { ventas, hoy } = useSell()
    const { compras } = useBuy()
    const { online } = useOnline()

    const { comprasDb } = usePurchases()
    const [resultado, setResultado] = useState<number>()
    const [ventasTotalDinero, setVentasTotalDinero] = useState<number>()
    const [comprasTotalDinero, setComprasTotalDinero] = useState<number>()
    const { ventasDb, error, cargando } = useSalesDb()

    const comprasMes = compras.filter(c =>
        c.fecha.split("-")[1] === hoy.split("-")[1].padStart(2, "0")
            && c.status !== "pending-delete"
            && c.producto ? c.producto == producto : true).sort((a, b) => Number(a.fecha.split("-")[2]) - Number(b.fecha.split("-")[2]))

    const ventasMes = ventas.filter(v =>
        v.fecha.split("-")[1] === hoy.split("-")[1].padStart(2, "0")
            && v.status !== "pending-delete"
            && v.producto ? v.producto == producto : true)

    const ultimaCompra = comprasDb ?
        comprasDb
            .filter(c => c.producto === producto)
            .sort((a, b) => Number(b.fecha.split("-")[2]) - Number(a.fecha.split("-")[2]))[0]

        : null



    useEffect(() => {

        if (!online) {
            const ventasTotalDinero = ventasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.precioTotal : acc, 0)
            const comprasTotalDinero = comprasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.precio : acc, 0)
            setVentasTotalDinero(ventasTotalDinero)
            setComprasTotalDinero(comprasTotalDinero)
        } else {
            if (!cargando) {

                if (ventasDb && ultimaCompra) {
                    const venasProducto = ventasDb.filter(p => p.producto ? p.producto == producto : producto == "helado" ? true : false)
                    const ventasDesdeReposicion = venasProducto.filter(v => {
                        return (Number(v.fecha.split("-")[2])) >= Number(ultimaCompra.fecha.split("-")[2])
                    })
                    const ventasTotalDinero = ventasDesdeReposicion.reduce((acc, v) => acc + v.precioTotal, 0)
                    setVentasTotalDinero(ventasTotalDinero)
                }
                if (comprasDb != null) {
                    const comprasProducto = comprasDb.filter(p => p.producto == producto)
                        .sort((a, b) => Number(b.fecha.split("-")[2]) - Number(a.fecha.split("-")[2]))[0]
                    console.log(comprasProducto)

                    if (comprasProducto !== undefined) {
                        const comprasTotalDinero = comprasProducto.precio

                        setComprasTotalDinero(comprasTotalDinero)
                    }
                }
            }
        }
    }, [online, comprasDb, ventasDb, producto, comprasMes, ventasMes, ultimaCompra])
    useEffect(() => {
        if (ventasTotalDinero === undefined || comprasTotalDinero === undefined) return

        const calculo = comprasTotalDinero - ventasTotalDinero
        setResultado(calculo)
    }, [comprasTotalDinero, ventasTotalDinero])




    const [searchParams] = useSearchParams();

    const irAlLote = () => {
        navigate({
            pathname: "/lote",
            search: `?${searchParams.toString()}`
        });
    };


    if (!online) return null
    if (error) return <p>{error}</p>

    return (
        <div className="w-full border bg-[#DAF5FF] rounded-2xl flex text-xl md:text-2xl flex-col justify-between relative overflow-hidden">

            <div className=" border top-0 left-0 gap-x-10 gap-y-1 right-0 flex sm:gap-y-3 w-full  items-center justify-between z-10   bg-amber-200 rounded-2xl px-6 py-3 ">

                <div className="text-xl whitespace-nowrap md:text-3xl font-medium">
                    {online ? <i className="fa-solid fa-chart-simple"></i> : "📊"}
                    <span>
                        Panel  Mensual
                    </span>
                </div>

                <div className=" justify-end flex items-end ">
                    <button className="text-sm   text-end whitespace-nowrap sm:text-2xl font-medium self-end justify-self-end border-2 rounded-2xl cursor-pointer p-1" onClick={() => navigate("/record")}>
                        {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                        <span className=""> Ver Historial</span>
                    </button>
                </div>
            </div>
            {cargando ?
                <div className="flex w-full justify-center p-3 items-center">
                    <span>
                        Cargando
                    </span>
                    {!online ?
                        <span className="animate-bounce">
                            ☁
                        </span>
                        :
                        <span><i className="fa-solid fa-cloud-arrow-down animate-bounce"></i></span>
                    }
                </div>
                :
                <div
                    className={`  w-full flex flex-row md:flex-row justify-evenly gap-4 p-2 px-2 transition-all duration-300 ease-in-out filter${animar ? "scale-110 -translate-y-12/12" : "translate-y-0"}`} >

                    <div className="w-full md:w-full text-md  bg-[#616163] justify-evenly  text-white  min-h-32 md:h-40   rounded-2xl flex flex-col    border-2 shadow-md   p-2 "
                        onClick={() => irAlLote()}>
                        <div className="">
                            <span className="font-semibold">Compras: </span>
                            <span className="font-bold">${comprasTotalDinero}</span>
                        </div>
                        <div>
                            <span className="font-semibold">Ventas: </span>
                            <span className="font-bold">${ventasTotalDinero}</span>
                        </div>
                        {comprasTotalDinero && ventasTotalDinero && comprasTotalDinero < ventasTotalDinero ?
                            <div className={`${resultado == undefined ? "hidden" : ""}`}>
                                <span className="font-semibold">Ganancia: </span>
                                <span className="font-bold text-green-300 animate-pulse">${resultado ? resultado * -1 : resultado}</span>
                            </div>
                            :
                            <div >
                                <span className="font-semibold">A recuperar: </span>
                                <span className="font-bold text-red-300">${resultado}</span>
                            </div>}


                    </div>


                </div>

            }
        </div >
    )
}