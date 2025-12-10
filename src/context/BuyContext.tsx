import { createContext, useEffect, useState, type ReactNode } from "react";
import { useSell } from "./useSell";

export interface Compra {
    precio: number;
    cantidad: number;
    fecha: string;
}

interface BuyContextInterface {
    precioCompra: string,
    cantidadCompra: string,
    registrarCompra: () => void
    setCantidadCompra: (valor: string) => void
    setPrecioCompra: (valor: string) => void
    compras: Compra[]
    setCompras: (compra: Compra[]) => void
}


export const BuyContext = createContext<BuyContextInterface | undefined>(undefined);

export const BuyProvider = ({ children }: { children: ReactNode }) => {
    const [precioCompra, setPrecioCompra] = useState<string>("")
    const [cantidadCompra, setCantidadCompra] = useState<string>("")
    const { hoy } = useSell()

    const [compras, setCompras] = useState<Compra[]>(() => {
        const comprasGuardadas = localStorage.getItem("compras")
        if (!comprasGuardadas) {
            return []
        } else {
            return JSON.parse(comprasGuardadas)
        }
    })


    const registrarCompra = () => {
        const nuevaCompra: Compra = {
            fecha: hoy,
            cantidad: Number(cantidadCompra),
            precio: Number(precioCompra)
        }

        setCompras([...compras, nuevaCompra])

        setCantidadCompra("")
        setPrecioCompra("")
    }

    useEffect(() => {
        localStorage.setItem("compras", JSON.stringify(compras))
    }, [compras])

    return (
        <BuyContext.Provider value={{
            precioCompra,
            cantidadCompra,
            registrarCompra,
            setCantidadCompra,
            setPrecioCompra,
            compras,
            setCompras
        }} >
            {children}
        </BuyContext.Provider>
    )
}