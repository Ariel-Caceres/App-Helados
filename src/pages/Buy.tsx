import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { useOnline } from "../context/useOnline";
import { useBuy } from "../context/useBuy";
import { useState } from "react";

export const Buy = () => {
    const navigate = useNavigate()
    const { online } = useOnline()
    const { setPrecioCompra, setCantidadCompra, precioCompra, cantidadCompra, registrarCompra } = useBuy()
    const [cantidadInvalida, setCantidadInvalida] = useState<boolean>(false)
    const [precioInvalido, setPrecioInvalido] = useState<boolean>(false)



    const autCompra = (precio: string, cantidad: string) => {
        if (!precio || !cantidad || Number(precio) == 0 || Number(cantidad) == 0) {
            if (!precio || Number(precio) == 0) {
                console.log("Cantidad Invalida")
                setCantidadInvalida(true)
            }
            if (!cantidad || Number(cantidad) == 0) {
                setPrecioInvalido(true)
                console.log("Precio Invalido")
            }
        } else {
            registrarCompra()
            navigate("/")
        }
    }

    const cancelar = () => {
        setCantidadCompra("");
        setPrecioCompra("");
        navigate("/")
    }



    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-10 px-2 items-center mt-[5vh]">
            <Header />

            <div className='w-full min-h-10 border bg-[#FFBFA0]  rounded-2xl flex flex-col items-center'>

                <div className='w-full border h-16 flex items-center bg-amber-200 rounded-2xl '>

                    <span className="text-2xl whitespace-nowrap md:text-3xl font-medium px-6">
                        {online ? <i className="fa-solid text-3xl fa-cart-shopping"></i> : "📦"}
                        Comprar:</span>
                </div>

                <form className="w-full sm:w-2/3 lg:w-1/2  flex flex-col items-center gap-5 py-10 justify-between" onSubmit={(e) => { e.preventDefault(); autCompra(precioCompra, cantidadCompra) }}>

                    <div className="w-full flex bg-[#FFD3BE] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            placeholder="Ej. 1"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cantidadInvalida ? "border-4 border-red-700" : ""}`}
                            value={cantidadCompra}
                            onChange={(e) => setCantidadCompra(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full flex bg-[#FFD3BE] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="precio" className={`text-lg sm:text-2xl font-medium w-1/3 `}>Precio:</label>
                        <input
                            type="number"
                            id="precio"
                            placeholder="Ej. 100$"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${precioInvalido ? "border-4 border-red-700" : ""}`}
                            value={precioCompra}
                            onChange={(e) => setPrecioCompra((e.target.value))}
                            required

                        />
                    </div>

                    <div className='w-full flex flex-col-reverse sm:flex-row justify-center items-center gap-4 sm:gap-10 sm:justify-evenly'>
                        <Button tipo="button" onClick={() => cancelar()} texto="Cancelar" />
                        <Button tipo="submit" onClick={() => { }} texto="Confirmar" />
                    </div>
                </form>

            </div>

        </div >
    )
}