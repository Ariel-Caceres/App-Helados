import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"
import { useState } from "react"

export const Modal = () => {
    const navigate = useNavigate()
    const [cartelPrecio, setCartelPrecio] = useState<boolean>(false)
    const [cantUno, setCantUno] = useState<boolean>(false)
    const [cartelCantidad, setCartelCantidad] = useState<boolean>(false)
    const { sabor, precio, cantidad, setSabor, setPrecio, setCantidad, registrarVenta } = useSell()

    const changeHandler = (valor: string) => {
        setPrecio(valor)
    }

    const changeHandlerSabor = (sabor: string) => {
        setSabor(sabor)
    }

    const changeHandlerCantidad = (cantidad: string) => {
        setCantidad(cantidad)
        if (cantidad == "1") {
            setCantUno(true)
        } else {
            setCantUno(false)
        }
    }

    const auth = (precio: string, cantidad: string) => {
        if (!precio || !cantidad || Number(precio) == 0 || Number(cantidad) == 0) {
            if (!precio || Number(precio) == 0) {
                console.log("agregar precio")
                setCartelPrecio(true)
            }
            if (!cantidad || Number(cantidad) == 0) {
                setCartelCantidad(true)
                console.log("agregar cantidad")
            }
        } else {
            registrarVenta()
            navigate("/")
        }
    }

    const cancelar = () => {
        setPrecio("");
        setCantidad("");
        setSabor("");
    }

    const sabores = [
        "Coco🥥",
        "Coco quemado 🔥",
        "Menta ☘",
        "Frutilla 🍓",
        "Banana 🍌",
        "Uva 🍇",
        "Naranja🟠"
    ];


    return (

        <div className="w-full max-w-3xl mx-auto flex flex-col mt-2 md:mt-20 gap-5 px-4">
            <Header />

            <div className='w-full min-h-10 bg-[#DAF5FF]  rounded-2xl flex flex-col items-center'>

                <div className='w-full h-16 flex items-center bg-amber-200 rounded-t-2xl'>
                    <span className='text-2xl sm:text-3xl font-medium ml-6 sm:ml-10'>🤑 Vender:</span>
                </div>

                <div className='w-full sm:w-2/3 lg:w-1/2  flex flex-col items-center gap-5 py-10 justify-between'>


                    <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                        <label htmlFor="cantidad" className="text-lg sm:text-2xl font-medium w-1/3">Cantidad:</label>
                        <input
                            type="number"
                            id="cantidad"
                            placeholder="Ej. 1"
                            className={`border-2 pl-2 rounded-xl h-10 bg-white w-2/3 ${cartelCantidad ? "border-4 border-red-700" : ""}`}
                            value={cantidad}
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
                            onChange={(e) => changeHandler(e.target.value)}
                            required

                        />
                    </div>
                    {cantUno &&
                        <div className="w-full flex bg-[#B1F6FF] h-20 justify-between px-4 items-center rounded-2xl border-2">
                            <label htmlFor="sabor" className="text-lg sm:text-2xl font-medium w-1/3">Sabor:</label>

                            <select name="" id="sabor" value={sabor} className="border-2 pl-2 rounded-xl h-10 bg-white w-2/3" onChange={(e) => changeHandlerSabor(e.target.value)}>
                                <option value=""></option>
                                {sabores.map((s, i) => (
                                    <option key={i} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    }

                </div>
            </div>

            <div className='w-full flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-0'>

                <div className="bg-white w-full sm:w-1/4 h-14 flex items-center justify-center text-black rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all">
                    <button className="w-full h-full hover:cursor-pointer" onClick={() => { navigate("/"); cancelar() }}>
                        <span className="text-xl sm:text-2xl font-bold">Cancelar</span>
                    </button>
                </div>

                <div className="bg-white w-full sm:w-1/4 h-14 flex items-center justify-center text-black rounded-2xl border-2 hover:bg-black hover:text-white hover:border-[#DAF5FF] transition-all">
                    <button className="w-full h-full hover:cursor-pointer" onClick={() => auth(precio, cantidad)}>
                        <span className="text-xl sm:text-2xl font-bold">Confirmar</span>
                    </button>
                </div>

            </div>
        </div >

    )
}