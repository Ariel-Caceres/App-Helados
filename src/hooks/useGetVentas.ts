import { useEffect, useState } from "react"
import type { Venta } from "../types/venta.entity"


export const useGetVentas = (mes: string) => {
    const [cargando, setCargando] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [ventasDb, setVentasDb] = useState<Venta[] | null>(null)


    useEffect(() => {
        const traerDataDb = async () => {
            setCargando(true)
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/sales/month/${mes}`)
                const data = await res.json()
                if (!res.ok) {
                    console.log("Error al traer las ventas de la base de datos");
                } else {
                    setVentasDb(data)
                    console.log("Fetch exitoso a ventas de db");
                }

            } catch (e) {
                setError("Error al traer las ventas")
                console.log("Error al traer las venas de la base de datos", e);
            } finally {
                setCargando(false)
            }
        }
        traerDataDb()
    }, [mes])

    return (

        {
            ventasDb,
            cargando,
            error
        }
    )
}