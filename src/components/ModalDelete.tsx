import type { Venta } from "../context/SellContext"

export const ModalDelete = ({ transaccion, eliminarTransaccion, setModalEliminar }: { transaccion: Venta, eliminarTransaccion: (transaccion: Venta) => void, setModalEliminar: (booleano: boolean) => void }) => {
    if (!transaccion) return null
    return (
        <div className="flex justify-between min-h-12 flex-col h-ful gap-5">
            <div className="flex justify-center w-full border-gray-300 border-2 items-center py-2">
                <span className="text-lg font-medium">¿Seguro que deseas eliminar esta venta?</span>
            </div>
            <div>
                <div className="  flex justify-between " >
                    <div className="w-1/4 border-2  border-r-0 ">
                        <span className="pl-2 text-xl font-bold">Fecha</span>
                    </div>
                    <div className="w-1/4 border-2 border-r-0">
                        <span className="pl-2 text-xl font-bold">Sabor</span>
                    </div>
                    <div className="w-1/4 border-2 border-r-0">
                        <span className="pl-1 text-xl font-bold">Cantidad</span>
                    </div>
                    <div className="w-1/4 border-2 ">
                        <span className="pl-2 text-xl font-bold">Precio</span>
                    </div>
                </div>

                <div className="flex justify-between min-h-12">
                    <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                        <span>{transaccion.fecha}</span>
                    </div>
                    <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                        <span>{transaccion.sabor}</span>
                    </div>
                    <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                        <span>{transaccion.cantidad}</span>
                    </div>
                    <div className="flex justify-center w-1/4 border-gray-300 border-2 items-center ">
                        <span>${transaccion.precio}</span>
                    </div>

                </div>
            </div>


            <div className="w-full flex justify-center gap-10">
                <button className="p-2 border-2 rounded-md font-medium" onClick={() => setModalEliminar(false)}>Cancelar</button>
                <button className="p-2 border-2 rounded-md font-medium" onClick={() => { eliminarTransaccion(transaccion); setModalEliminar(false) }}>Confirmar</button>
            </div>
        </div>
    )
}