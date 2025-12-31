import { useSell } from "../context/useSell"


export const HeaderTabla = () => {
    const { setOrden, orden } = useSell()

    const ordenHandler = (tipo: string) => {
        // Definimos el siguiente paso para cada estado
        const siguienteOrden = {
            "": `${tipo} Des`,
            [`${tipo} Des`]: `${tipo} Asd`,
            [`${tipo} Asd`]: `${tipo} Des`
        };

        // Buscamos el estado actual en el mapa y actualizamos
        // Si 'orden' no coincide con el tipo actual, empezamos desde el inicio del ciclo
        const nuevoEstado = siguienteOrden[orden] || `${tipo} Des`;
        setOrden(nuevoEstado);
    };

    return (
        <div className="  flex justify-between  " >
            <div className={`w-1/4 border-2  border-r-0 flex justify-evenly ${orden.includes("fecha") ? "bg-red-200" : ""}`} onClick={() => ordenHandler("fecha")}>
                <span className="pl-2 text-xl font-bold">Fecha</span>
            </div>
            <div className="w-1/4 border-2 border-r-0" onClick={() => ordenHandler("cantidad")}>
                <span className="pl-1 text-xl font-bold">Cantidad</span>
            </div>
            <div className="w-1/4 border-2 border-r-0" onClick={() => ordenHandler("precioTotal")}>
                <span className="pl-2 text-xl font-bold">Precio</span>
            </div>
            <div className="w-1/4 border-2 ">
                <span className="pl-2 text-xl font-bold">Acciones</span>
            </div>

        </div>

    )

}