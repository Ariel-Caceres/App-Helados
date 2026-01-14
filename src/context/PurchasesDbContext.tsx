import { createContext, type ReactNode } from "react"
import type { Compra } from "../types/compra.entity"
import { GetComprasDb } from "../hooks/useGetComprasDb"
import { useSell } from "../hooks/useSell"

interface PurchasesDb {
    comprasDb: Compra[] | null
}

export const PurchasesContext = createContext<PurchasesDb | undefined>(undefined)
export const PurchasesProvider = ({ children }: { children: ReactNode }) => {
    const { hoy } = useSell()
    const mesActual = hoy.split("-")[1].padStart(2, "0")
    const { comprasDb } = GetComprasDb(mesActual)


    return (
        <PurchasesContext.Provider value={
            { comprasDb }
        }>
            {children}
        </PurchasesContext.Provider>
    )
}