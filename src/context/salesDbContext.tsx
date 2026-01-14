import { createContext, type ReactNode } from "react";
import { useGetVentas } from "../hooks/useGetVentas";
import type { Venta } from "../types/venta.entity";

interface salesDbInterface {
    ventasDb: Venta[] | null
    cargando: boolean
    error: string | null
}

export const SalesDb = createContext<salesDbInterface | undefined>(undefined)
export const SalesDbProvider = ({ children }: { children: ReactNode }) => {

    const { ventasDb, cargando, error } = useGetVentas("01")

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