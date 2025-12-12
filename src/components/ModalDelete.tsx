import type { Venta } from "../context/SellContext"
import type { Compra } from "../context/BuyContext"

type DeleteProps =
    | {
        tipo: "venta";
        transaccion: Venta;
        eliminarTransaccion: () => void;
        setModalEliminar: (v: boolean) => void;
    }
    | {
        tipo: "compra";
        compraAEliminar: Compra;
        eliminarCompra: () => void;
        setModalEliminarCompra: (v: boolean) => void;
    };

export const ModalDelete = (props: DeleteProps) => {

    return (
        <>
            {props.tipo == "venta" &&
                <div className="flex justify-between min-h-12 flex-col h-ful gap-5 mb-5">
                    <div className="flex justify-center w-full border-gray-300 border-2 items-center py-2">
                        <span className="text-lg font-medium">¿Seguro que deseas eliminar esta venta?</span>
                    </div>
                    <div>
                        <div className="  flex justify-between " >
                            <div className="w-1/3 border-2  border-r-0 ">
                                <span className="pl-2 text-xl font-bold">Fecha</span>
                            </div>

                            <div className="w-1/3 border-2 border-r-0">
                                <span className="pl-1 text-xl font-bold">Cantidad</span>
                            </div>
                            <div className="w-1/3 border-2 ">
                                <span className="pl-2 text-xl font-bold">Precio</span>
                            </div>
                        </div>

                        <div className="flex justify-between min-h-12">
                            <div className="flex justify-center w-1/3 border-gray-300 border-2 items-center ">
                                <span>{props.transaccion.fecha}</span>
                            </div>

                            <div className="flex justify-center w-1/3 border-gray-300 border-2 items-center ">
                                <span>{props.transaccion.cantidad}</span>
                            </div>
                            <div className="flex justify-center w-1/3 border-gray-300 border-2 items-center ">
                                <span>${props.transaccion.precioTotal ? props.transaccion.precioTotal : (props.transaccion.precio * props.transaccion.cantidad)}</span>
                            </div>

                        </div>
                    </div>


                    <div className="w-full flex justify-center gap-10">
                        <button className="p-2 border-2 rounded-md font-medium w-1/5" onClick={() => { props.setModalEliminar(false); }}>Cancelar</button>
                        <button className="p-2 border-2 rounded-md font-medium w-1/5" onClick={() => { props.eliminarTransaccion(); props.setModalEliminar(false) }}>Confirmar</button>
                    </div>
                </div>
            }
            {props.tipo == "compra" &&
                <div className="flex justify-between min-h-12 flex-col h-ful gap-5">
                    <div className="flex justify-center w-full border-gray-300 border-2 items-center py-2">
                        <span className="text-lg font-medium">¿Seguro que deseas eliminar esta compra?</span>
                    </div>
                    <div>
                        <div className="  flex justify-between " >
                            <div className="w-1/3 border-2  border-r-0 ">
                                <span className="pl-2 text-xl font-bold">Fecha</span>
                            </div>
                            <div className="w-1/3 border-2 border-r-0">
                                <span className="pl-1 text-xl font-bold">Cantidad</span>
                            </div>
                            <div className="w-1/3 border-2 ">
                                <span className="pl-2 text-xl font-bold">Precio</span>
                            </div>
                        </div>

                        <div className="flex justify-between min-h-12">
                            <div className="flex justify-center w-1/3 border-gray-300 border-2 items-center ">
                                <span>{props.compraAEliminar.fecha}</span>
                            </div>

                            <div className="flex justify-center w-1/3 border-gray-300 border-2 items-center ">
                                <span>{props.compraAEliminar.cantidad}</span>
                            </div>
                            <div className="flex justify-center w-1/3 border-gray-300 border-2 items-center ">
                                <span>${props.compraAEliminar.precio}</span>
                            </div>

                        </div>
                    </div>


                    <div className="w-full flex justify-center mb-5 gap-10 ">
                        <button className="p-2 border-2 rounded-md font-medium w-1/5" onClick={() => props.setModalEliminarCompra(false)}>Cancelar</button>
                        <button className="p-2 border-2 rounded-md font-medium w-1/5" onClick={() => { props.eliminarCompra(); props.setModalEliminarCompra(false) }}>Confirmar</button>
                    </div>
                </div>
            }

        </>

    )
}