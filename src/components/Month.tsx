import { useOnline } from "../context/useOnline"
import { useSell } from "../context/useSell"
import type { Venta } from "../context/SellContext"
import { HeaderTabla } from "../components/HeaderTabla"
import type { Compra } from "../context/BuyContext";
import { useBuy } from "../context/useBuy";

// type AccionesProps = {
//     mes: string
//     setVentaAEditar: (v: Venta | undefined) => void
//     setModalEliminar: () => void
//     setTransaccion: (v: Venta | undefined) => void
// }

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
    };

export const Month = (props: AccionesProps) => {
    const { ventas } = useSell()
    const { compras } = useBuy()
    const { online } = useOnline()
    const ventasMes = ventas.filter(v => v.fecha.split("-")[1] === props.mes)
    const comprasMes = compras.filter(v => v.fecha.split("-")[1] === props.mes)
    const ventasTotalDinero = ventasMes.reduce((acc, v) => acc + v.precioTotal, 0)
    const ventasTotalCantidad = ventasMes.reduce((acc, v) => acc + v.cantidad, 0)
    const comprasTotalDinero = comprasMes.reduce((acc, v) => v.precio ? acc + v.precio : acc + v.precio, 0)
    const comprasTotalCantidad = comprasMes.reduce((acc, v) => acc + v.cantidad, 0)


    return (
        <div className="mb-5">
            {props.tipo == "venta" &&
                (ventasMes.length != 0 ?
                    <div>
                        <HeaderTabla />
                        {ventasMes.map((v, i) => (
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
                            </div>))}
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