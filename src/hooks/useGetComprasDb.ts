import { useEffect, useState } from "react";
import type { Compra } from "../types/compra.entity";
import { useOnline } from "./useOnline";
export const GetComprasDb = (mes: string) => {
    const [comprasDb, setComprasDb] = useState<Compra[] | null>(null)
    const { online } = useOnline()

    useEffect(() => {
        if (online) {
            const traerDataDb = async () => {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/purchases/month/${mes}`)
                    if (!res.ok) {
                        console.log("Error al traer las compras de la base de datos");
                    } else {
                        const data = await res.json()
                        setComprasDb(data)
                    }

                } catch (e) {
                    console.log("Error al traer las compras de la base de datos", e);

                }
            }
            traerDataDb()
        }
    }, [mes, online])

    return (
        { comprasDb }
    )
}