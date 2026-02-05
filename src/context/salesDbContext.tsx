import { createContext, type ReactNode } from "react";
import { useGetVentas } from "../hooks/useGetVentas";
import type { Venta } from "../types/venta.entity";
import { useSell } from "../hooks/useSell";

interface salesDbInterface {
    ventasDb: Venta[] | null
    cargando: boolean
    error: string | null
}

export const SalesDb = createContext<salesDbInterface | undefined>(undefined)
export const SalesDbProvider = ({ children }: { children: ReactNode }) => {
    const { hoy } = useSell()
    const mes = hoy.split("-")[1]
    console.log(mes)
    const { ventasDb, cargando, error } = useGetVentas(mes)

    return (
        <SalesDb.Provider value={{
            ventasDb,
            cargando,
            error

        }}>
            {children}
        </SalesDb.Provider>
    )
}