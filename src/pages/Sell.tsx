import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../hooks/useSell"
import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { useOnline } from "../hooks/useOnline"
import type { Producto } from "../context/SellContext"



export const Modal = () => {
    const navigate = useNavigate()
    const { precios, cantidad, setPrecios, setCantidad, registrarVenta, producto, setProducto, totalManual, totalSugerido, setTotalManual } = useSell()
    const [cartelPrecioTotal, setCartelPrecioTotal] = useState<boolean>(false)
    const [cartelPrecio, setCartelPrecio] = useState<boolean>(false)
    const [cartelCantidad, setCartelCantidad] = useState<boolean>(false)
    const { online } = useOnline()
    const [modoCalculo, setModoCalculo] = useState<"cantidad" | "total">("cantidad");



    const auth = (precio: string, cantidad: string) => {
        const precioInvalido = Number(precio) <= 0 || !Number.isInteger(Number(precio));
        const cantInvalida = Number(cantidad) <= 0 || !Number.isInteger(Number(cantidad))
        const totalFinal = totalManual ?? totalSugerido;
        const precioTotalInvalido = totalFinal <= 0;

        location.reload()
        if (precioInvalido || cantInvalida || precioTotalInvalido) {
            if (precioInvalido) {
                console.log("Agregar precio")
                setCartelPrecio(true)
            }
            if (cantInvalida) {
                setCartelCantidad(true)
                console.log("Agregar cantidad")
            }
            if (precioTotalInvalido) {
                setCartelPrecioTotal(true)
                console.log("Agregar precio total")
            }
            return

        } else {
            registrarVenta()
            navigate("/")
        }
    }

    const cancelar = () => {
        setCantidad("");
        navigate("/")
    }

    useEffect(() => {
        setCantidad("");
        setTotalManual(null);
    }, [producto]);



    useEffect(() => {
        const precioUnitario = precios[producto];
        if (!precioUnitario) return;



    }, [cantidad, producto, precios, modoCalculo]);




    return (

        <div className="w-full max-w-3xl mx-auto flex flex-col gap-5 px-2 items-center mt-[5vh]">
            <Header />

            <div className='w-full min-h-10 border bg-[#DAF5FF]  rounded-2xl flex flex-col items-center'>

                <div className='w-full border h-16 flex items-center bg-amber-200 rounded-2xl text-2xl whitespace-nowrap md:text-3xl font-medium px-6'>
                    {online ? <i className="fa-solid fa-cash-register"></i> : "🤑"}
                    <span className="">Vender:</span>
                </div>


                <form className="w-full sm:w-2/3 lg:w-1/2  flex flex-col items-center gap-2 py-2 justify-between" action="" onSubmit={(e) => { e.preventDefault(); auth(String(precios[producto]), cantidad) }}>

                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="producto" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Producto:</label>
                        <select name="producto" id="producto" className={`border-2 pl-2 rounded-xl h-10 animate-pulse    bg-white w-2/3 ${cartelCantidad ? "border-4 border-red-700" : ""}`}
                            onChange={(e) => setProducto(e.target.value as Producto)} value={producto} >
                            <option value="helado">Helado</option>
                            <option value="pollo-trozado">Pollo trozado</option>
                            <option value="carne-picada">Carne picada</option>
                        </select>
                    </div>

                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            placeholder="Ej. 1"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cartelCantidad ? "border-4 border-red-700" : ""}`}
                            value={cantidad}
                            onChange={(e) => { setCantidad(e.target.value); setModoCalculo("cantidad") }}
                            required
                        />
                    </div>

                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="precio" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Precio:</label>
                        <input
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cartelPrecio ? "border-4 border-red-700" : ""}`}
                            required
                            type="number"
                            id="precio"
                            value={precios[producto] != 0 ? precios[producto] : ""}
                            onChange={(e) => {
                                const nuevoPrecio = Number(e.target.value);

                                setPrecios(prev => ({
                                    ...prev,
                                    [producto]: nuevoPrecio
                                }));
                            }}
                        />


                    </div>

                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="total" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Total:</label>
                        <input
                            type="number"
                            id="total"
                            placeholder="Ej. 100$"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cartelPrecioTotal ? "border-4 border-red-700" : ""}`}

                            value={(totalManual ?? totalSugerido) ?? ""}
                            onChange={(e) => setTotalManual(Number(e.target.value))}
                        />
                    </div>


                    <div
                        className="
    w-full
    flex flex-col-reverse
    justify-center
    items-center
    gap-4

    absolute bottom-[5vh]

    sm:static
    sm:flex-row
    sm:gap-10
    sm:justify-evenly
  ">
                        <Button tipo="button" texto="Cancelar" onClick={() => cancelar()} />
                        <Button tipo="submit" texto="Confirmar" onClick={() => { }} />
                    </div>
                </form>
            </div>


        </div >

    )

}