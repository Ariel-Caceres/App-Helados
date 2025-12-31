import { createContext, useEffect, useState, type ReactNode } from "react";
import { useSell } from "./useSell";
import type { Compra } from "../types/compra.entity";
import { v4 as uuidv4 } from 'uuid';
import type { UUID } from "../types/uuid";

interface BuyContextInterface {
    precioCompra: string,
    cantidadCompra: string,
    registrarCompra: () => void
    setCantidadCompra: (valor: string) => void
    setPrecioCompra: (valor: string) => void
    compras: Compra[]
    setCompras: React.Dispatch<React.SetStateAction<Compra[]>>
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
            id: uuidv4() as UUID,
            fecha: hoy,
            cantidad: Number(cantidadCompra),
            precio: Number(precioCompra),
            status: "pending-create"
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