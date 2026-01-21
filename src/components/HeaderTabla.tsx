
interface HeaderTabla {
    tipo: "lote" | "month"
}
export const HeaderTabla = ({ tipo }: { tipo: string }) => {


    return (
        <div className="  flex justify-between  " >
            <div className={`w-1/4 border-2  border-r-0  `} >
                <span className="pl-2 text-xl font-bold">Fecha</span>
            </div>
            {tipo == "month" &&
                <div className="w-1/4 border-2 border-r-0">
                    <span className="pl-2 text-xl font-bold">Producto</span>
                </div>
            }
            <div className="w-1/4 border-2 border-r-0" >
                <span className="pl-1 text-xl font-bold">Cantidad</span>
            </div>
            <div className="w-1/4 border-2 border-r-0" >
                <span className="pl-2 text-xl font-bold">Precio</span>
            </div>
            {tipo == "month" ?
                <div className="w-1/4 border-2 ">
                    <span className="pl-2 text-xl font-bold">Acciones</span>
                </div>
                :
                <div className="w-1/4 border-2 ">
                    <span className="pl-2 text-xl font-bold">Tipo</span>
                </div>
            }
        </div>

    )

}