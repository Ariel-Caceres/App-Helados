import { useNavigate } from "react-router-dom"
import { useSell } from "../context/useSell"
import { useBuy } from "../context/useBuy"
import { useOnline } from "../context/useOnline"


export const MonthResume = ({ producto, animar }: { producto: string, animar: boolean }) => {
    const navigate = useNavigate()
    const { ventas, hoy } = useSell()
    const { compras } = useBuy()
    const { online } = useOnline()

    const ventasMes = ventas.filter(v =>
        v.fecha.split("-")[1] === hoy.split("-")[1].padStart(2, "0")
            && v.status !== "pending-delete"
            && v.producto ? v.producto == producto : true)
    const comprasMes = compras.filter(c =>
        c.fecha.split("-")[1] === hoy.split("-")[1].padStart(2, "0")
            && c.status !== "pending-delete"
            && c.producto ? c.producto == producto : true)


    const ventasTotalDinero = ventasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.precioTotal : acc, 0)
    const ventasTotalCantidad = ventasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.cantidad : acc, 0)
    const comprasTotalDinero = comprasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.precio : acc, 0)
    const comprasTotalCantidad = comprasMes.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.cantidad : acc, 0)



    return (
        <div className="w-full border bg-[#DAF5FF] rounded-2xl flex  flex-col justify-between relative overflow-hidden">

            <div className=" border top-0 left-0 gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between z-10   bg-amber-200 rounded-2xl px-6 py-4 ">

                <div className="text-xl whitespace-nowrap md:text-3xl font-medium">
                    {online ? <i className="fa-solid fa-chart-simple"></i> : "📊"}
                    <span>
                        Panel  Mensual
                    </span>
                </div>

                <div className=" justify-end flex items-end ">
                    <button className="text-md   text-end whitespace-nowrap sm:text-2xl font-medium self-end justify-self-end border-2 rounded-2xl cursor-pointer p-1" onClick={() => navigate("/record")}>
                        {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                        <span className=""> Ver Historial</span>
                    </button>
                </div>
            </div>

            <div
                className={`
    w-full flex flex-row md:flex-row justify-evenly gap-4 p-2 px-2
    transition-all duration-300 ease-in-out
    filter
    ${animar ? "scale-110 -translate-y-12/12" : "translate-y-0"}
  `}
            >

                <div className="w-1/2 md:w-1/3 text-2xl  bg-[#FFBFA0]    min-h-32 md:h-40   rounded-2xl flex flex-col    border-2 shadow-md   p-4 ">
                    <div className="">
                        <span className="font-semibold">Compras: </span>
                        <span className="font-bold">{comprasTotalCantidad}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Egreso: </span>
                        <span className="font-bold">{comprasTotalDinero}</span>
                    </div>

                </div>

                <div className=" text-2xl    w-1/2  md:w-1/3     bg-[#87F6FF]   min-h-32 md:h-40    rounded-2xl flex flex-col    border-2 shadow-md   p-4  ">
                    <div className="">
                        <span className="font-semibold">Ventas: </span>
                        <span className="font-bold">{ventasTotalCantidad}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Ingresos: </span>
                        <span className="font-bold">{ventasTotalDinero}</span>
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>)
}