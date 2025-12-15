import { useState } from "react"
import { useSell } from "../context/useSell"
import type { Venta } from "../context/SellContext"
import type { Compra } from "../context/BuyContext"
import { Button } from "../components/Button"
import { useBuy } from "../context/useBuy"
import { useOnline } from "../context/useOnline"

type EditProps =
    | { ventaAEditar: Venta; compraAEditar?: never; onClick: () => void }
    | { compraAEditar: Compra; ventaAEditar?: never; onClick: () => void };


export const Edit = ({ ventaAEditar, compraAEditar, onClick }: EditProps) => {
    const { ventas, setVentas } = useSell()
    const { online } = useOnline()
    const { compras, setCompras } = useBuy()
    const [editarPrecio, setEditarPrecio] = useState<string>(String(ventaAEditar?.precio))
    const [editarPrecioCompra, setEditarPrecioCompra] = useState<string>(String(compraAEditar?.precio))
    const [editarCantidadCompra, setEditarCantidadCompra] = useState<string>(String(compraAEditar?.cantidad))
    const [editarCantidad, setEditarCantidad] = useState<string>(String(ventaAEditar?.cantidad))
    const cantInvalidaCompra = Number(editarCantidadCompra) <= 0 || !Number.isInteger(Number(editarCantidadCompra))
    const precioInvalidoCompra = Number(editarPrecioCompra) <= 0 || !Number.isInteger(Number(editarPrecioCompra))
    const precioInvalido = Number(editarPrecio) <= 0 || !Number.isInteger(Number(editarPrecio));
    const cantInvalida = Number(editarCantidad) <= 0 || !Number.isInteger(Number(editarCantidad))

    const editarProducto = () => {
        if (ventaAEditar) {
            const actualizado = ventas.map(v =>
                v === ventaAEditar ?
                    {
                        ...v,
                        precio: Number(editarPrecio),
                        cantidad: Number(editarCantidad),
                        precioTotal: Number(editarPrecio) * Number(editarCantidad)
                    }
                    : v

            )
            if (!cantInvalida && !precioInvalido) {
                setVentas(actualizado)
                onClick()
            }
        }
        if (compraAEditar) {
            const actualizado = compras.map(c =>
                c === compraAEditar ?
                    {
                        ...c,
                        precio: Number(editarPrecioCompra),
                        cantidad: Number(editarCantidadCompra)
                    }
                    : c

            )
            if (!cantInvalidaCompra && !precioInvalidoCompra) {
                setCompras(actualizado)
                onClick()
            }
        }

    }

    const handleChancePrecio = (valor: string) => {
        setEditarPrecio(valor)
    }





    return (
        <>
            <div className={`w-full min-h-10 border ${ventaAEditar ? "bg-[#DAF5FF]" : compraAEditar ? "bg-[#FFBFA0]" : "bg-[#DAF5FF]"} rounded-2xl flex flex-col items-center `}>

                <div className='w-full h-16 flex items-center bg-amber-200 border rounded-2xl gap-2 text-2xl whitespace-nowrap md:text-3xl font-medium px-6'>
                    {online ? <i className="fa-solid fa-file-pen"></i> : "✏"}
                    <span className=""> Editar:</span>
                    {ventaAEditar ? " Venta" : compraAEditar ? " Compra" : ""}
                </div>

                {ventaAEditar &&
                    <form className='w-full sm:w-2/3 lg:w-1/2  flex flex-col items-center gap-5 py-10 justify-between' onSubmit={(e) => { e.preventDefault(); editarProducto() }}>
                        <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                            <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                            <input type="number" id="cantidad" placeholder="Ej. 1" className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cantInvalida ? "border-4 border-red-500 animate-pulse" : ""}`}
                                value={editarCantidad}
                                onChange={(e) => setEditarCantidad(e.target.value)}
                                required
                            />
                        </div>

                        <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                            <label htmlFor="precio" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Precio:</label>
                            <input
                                type="number"
                                id="precio"
                                placeholder="Ej. 100$"
                                className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${precioInvalido ? "border-4 border-red-500 animate-pulse" : ""}`}
                                value={editarPrecio}
                                onChange={(e) => handleChancePrecio(e.target.value)}
                                required

                            />
                        </div>

                        <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                            <label htmlFor="total" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Total:</label>
                            <input
                                type="number"
                                id="total"
                                readOnly
                                placeholder="Ej. 100$"
                                className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${precioInvalido ? "border-4 border-red-500 animate-pulse" : ""}`}
                                value={Number(editarCantidad) * Number(editarPrecio)}
                                onChange={(e) => handleChancePrecio(e.target.value)}
                                required

                            />
                        </div>

                        <div
                            className="
    w-[98%]
    flex flex-col-reverse
    justify-center
    items-center
    gap-4

    absolute bottom-[20vh]

    sm:static
    sm:flex-row
    sm:gap-10
    sm:justify-evenly
  "
                        >                                      <Button tipo="button" texto="Cancelar" onClick={onClick} />
                            <Button tipo="submit" texto="Guardar" onClick={editarProducto} />
                        </div>

                    </form>
                }

                {compraAEditar &&
                    <form className='w-full sm:w-2/3 lg:w-1/2  flex flex-col items-center gap-5 py-10 justify-between '>
                        <div className="w-full flex bg-[#FFD3BE] h-20 justify-between px-4 items-center rounded-2xl border-2">
                            <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                            <input type="number" id="cantidad" placeholder="Ej. 1" className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cantInvalidaCompra ? "border-4 border-red-500 animate-pulse" : ""}`}
                                value={editarCantidadCompra}
                                onChange={(e) => setEditarCantidadCompra(e.target.value)}
                                required
                            />
                        </div>

                        <div className="w-full flex bg-[#FFD3BE] h-20 justify-between px-4 items-center rounded-2xl border-2">
                            <label htmlFor="precio" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Precio:</label>
                            <input
                                type="number"
                                id="precio"
                                placeholder="Ej. 100$"
                                className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${precioInvalidoCompra ? "border-4 border-red-500 animate-pulse" : ""}`}
                                value={editarPrecioCompra}
                                onChange={(e) => setEditarPrecioCompra(e.target.value)}
                                required

                            />
                        </div>

                        <div
                            className="
    w-[98%]
    flex flex-col-reverse
    justify-center
    items-center
    gap-4

    absolute bottom-[20vh]

    sm:static
    sm:flex-row
    sm:gap-10
    sm:justify-evenly
  "
                        >                            <Button tipo="button" texto="Cancelar" onClick={onClick} />
                            <Button tipo="submit" texto="Guardar" onClick={editarProducto} />
                        </div>
                    </form>
                }

            </div>

        </>

    )
}