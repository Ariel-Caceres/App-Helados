import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"
import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { useOnline } from "../context/useOnline"

export const Modal = () => {
    const navigate = useNavigate()
    const [cartelPrecio, setCartelPrecio] = useState<boolean>(false)
    const [cartelCantidad, setCartelCantidad] = useState<boolean>(false)
    const [cartelPrecioTotal, setCartelPrecioTotal] = useState<boolean>(false)
    const { precio, cantidad, setSabor, setPrecio, setCantidad, registrarVenta } = useSell()
    const { online } = useOnline()
    const [precioTotal, setPrecioTotal] = useState<string>("")
    const [cociente, setCociente] = useState<string>("")
    const [ultimoEditado, setUltimoEditado] = useState<"precio" | "cantidad" | "total" | null>(null)

    const changeHandlerPrecio = (valor: number) => {
        setUltimoEditado("precio")
        setPrecio(valor)
    }



    useEffect(() => {
        if (Number(precioTotal) >= precio) {
            setCociente(String(Number(precioTotal) / Number(precio)));
        }

    }, [precioTotal, precio]);

    useEffect(() => {
        setPrecioTotal(String(Number(precio) * Number(cantidad)));
    }, [cantidad, precio]);

    const changeHandlerCantidad = (valor: string) => {
        setCantidad(valor)
    }

    console.log(cantidad)

    const auth = (precio: string, cantidad: string) => {
        if (!precio || !cantidad || Number(precio) == 0 || Number(cantidad) == 0) {
            if (!precio || Number(precio) == 0) {
                console.log("Agregar precio")
                setCartelPrecio(true)
            }
            if (!cantidad || Number(cantidad) == 0) {
                setCartelCantidad(true)
                console.log("Agregar cantidad")
            }
            if (!precioTotal || Number(precioTotal) == 0) {
                setCartelPrecioTotal(true)
                console.log("Agregar cantidad")
            }
        } else {
            registrarVenta()
            navigate("/")
        }
    }

    const cancelar = () => {
        setPrecio(precio);
        setCociente("");
        setCantidad("");
        setSabor("");
        navigate("/")
    }

    const handleChangeTotal = (valor: string) => {
        setUltimoEditado("total")
        setPrecioTotal(valor)
    }


    return (

        <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 px-2 items-center mt-[5vh]">
            <Header />

            <div className='w-full min-h-10 border bg-[#DAF5FF]  rounded-2xl flex flex-col items-center'>

                <div className='w-full border h-16 flex items-center bg-amber-200 rounded-2xl text-2xl whitespace-nowrap md:text-3xl font-medium px-6'>
                    {online ? <i className="fa-solid fa-cash-register"></i> : "🤑"}
                    <span className="">Vender:</span>
                </div>

                <div className='w-full sm:w-2/3 lg:w-1/2  flex flex-col items-center gap-5 py-10 justify-between'>


                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            placeholder="Ej. 1"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cartelCantidad ? "border-4 border-red-700" : ""}`}
                            value={cantidad && Number(cociente) == 0 ? cantidad : Number(cociente) != 0 ? cociente : ""}
                            onChange={(e) => changeHandlerCantidad(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="precio" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Precio:</label>
                        <input
                            type="number"
                            id="precio"
                            placeholder="Ej. 100$"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cartelPrecio ? "border-4 border-red-700" : ""}`}
                            value={precio}
                            onChange={(e) => changeHandlerPrecio(Number(e.target.value))}
                            required

                        />
                    </div>

                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="total" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Total:</label>
                        <input
                            type="number"
                            id="total"
                            placeholder="Ej. 100$"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cartelPrecioTotal ? "border-4 border-red-700" : ""}`}
                            value={Number(precioTotal) != 0 ? precioTotal : ""}
                            onChange={(e) => handleChangeTotal((e.target.value))}

                        />
                    </div>



                </div>
            </div>

            <div className='w-full flex flex-col-reverse sm:flex-row justify-center items-center gap-4 sm:gap-10 sm:justify-evenly'>
                <Button texto="Cancelar" onClick={() => cancelar()} />
                <Button texto="Confirmar" onClick={() => auth(String(precio), cantidad)} />
            </div>
        </div >

    )
}