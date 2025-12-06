import { useState } from "react"
import { useSell } from "../context/useSell"
import type { Venta } from "../context/SellContext"



export const Edit = ({ ventaAEditar, vaciarVentaAEditar }: { ventaAEditar: Venta, vaciarVentaAEditar: () => void }) => {
    const { ventas, setVentas } = useSell()
    const [editarPrecio, setEditarPrecio] = useState<string>(String(ventaAEditar.precio))
    const [editarSabor, setEditarSabor] = useState<string>(String(ventaAEditar.sabor))
    const [editarCantidad, setEditarCantidad] = useState<string>(String(ventaAEditar.cantidad))


    const editarProducto = () => {
        const actualizado = ventas.map(v =>
            v === ventaAEditar ?
                {
                    ...v,
                    precio: Number(editarPrecio),
                    cantidad: Number(editarCantidad),
                    sabor: editarSabor
                }
                : v

        )
        if (editarPrecio !== "0" || editarCantidad !== "0") {
            setVentas(actualizado)
            vaciarVentaAEditar()
        }
    }





    if (!ventaAEditar) return null
    return (
        <div className="w-full min-h-10 bg-[#DAF5FF]  rounded-2xl flex flex-col items-center">
            <div className='w-full h-16 flex items-center bg-amber-200 rounded-t-2xl'>
                <span className='text-2xl sm:text-3xl font-medium ml-6 sm:ml-10'>✏ Editar:</span>
            </div>
            <div className='w-full sm:w-2/3 lg:w-1/2  flex flex-col items-center gap-5 py-10 justify-between'>
                <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                    <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                    <input type="number" id="cantidad" placeholder="Ej. 1" className="border-2 pl-2 rounded-xl h-10 bg-white w-2/3"
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
                        className="border-2 pl-2 rounded-xl h-10 bg-white w-2/3"
                        value={editarPrecio}
                        onChange={(e) => setEditarPrecio(e.target.value)}
                        required
                    />
                </div>
                {editarSabor &&
                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="sabor" className="text-lg sm:text-2xl font-medium w-1/3">Sabor:</label>
                        <select name="" id="sabor" value={editarSabor} onChange={(e) => setEditarSabor(e.target.value)} className="border-2 pl-2 rounded-xl h-10 bg-white w-2/3" >
                            <option value="">{ventaAEditar.sabor}</option>
                        </select>
                    </div>
                }
            </div>


            <div className='w-full flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-0'>
                <div className="bg-white w-full sm:w-1/4 h-14 mb-5 flex items-center justify-center text-black rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all">
                    <button className="w-full h-full hover:cursor-pointer" onClick={editarProducto}>
                        <span className="text-xl sm:text-2xl font-bold" >Guardar</span>
                    </button>
                </div>
                <div className="bg-white w-full sm:w-1/4 h-14 mb-5 flex items-center justify-center text-black rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all">
                    <button className="w-full h-full hover:cursor-pointer" onClick={vaciarVentaAEditar}>
                        <span className="text-xl sm:text-2xl font-bold" >Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}