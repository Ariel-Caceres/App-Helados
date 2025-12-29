import { createContext, useEffect, useState, type ReactNode } from "react";
import { useSell } from "./useSell";
import type { Venta } from "./SellContext";

interface OnlineContextInterface {
    online: boolean
}

export const OnlineContext = createContext<OnlineContextInterface | undefined>(undefined);

export const OnlineProvider = ({ children }: { children: ReactNode }) => {

    const { ventas } = useSell()

    const [online, setOnline] = useState<boolean>(navigator.onLine)


    useEffect(() => {
        const handleChange = () => setOnline(navigator.onLine)
        window.addEventListener("online", handleChange)
        window.addEventListener("offline", handleChange)

        window.removeEventListener("online", handleChange)
        window.removeEventListener("offline", handleChange)

    }, [])


    useEffect(() => {
        if (online && ventas != undefined) {
            ventas.forEach(async (v) => {
                if (v.status == "pending-create") {
                    v.status = "synced"
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/sell`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(v)

                        })
                        if (!res.ok) {
                            console.log("Error al enviar la venta a la base de datos", "venta en cuestión:", v)
                        } else {
                            console.log("Venta agregada a la base de datos exitosamente", v)
                        }
                    } catch (e) {
                        console.log("Error al enviar la venta a la base de datos", "venta en cuestión:", v, "Error:", e)
                    }
                }

                if (v.status == "pending-update") {
                    v.status = "synced"
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/edit/${v.id}`, {
                            method: "PUT",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify(v)
                        })
                        if (res.ok) {
                            console.log("Venta editada con éxito")
                        }
                    } catch (e) { console.log("Venta editada con error", e) }
                }

                if (v.status == "pending-delete") {
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/delete/${v.id}`, {
                            method: "DELETE"
                        })
                        if (!res.ok) {
                            console.log("error al borrar venta", v.id)
                        } else {
                            console.log("venta eliminada con éxito")
                            const ventasBorradas: Venta[] = ventas.filter(ventaaborrar => (ventaaborrar.id !== v.id))
                            localStorage.setItem("ventas", JSON.stringify(ventasBorradas))
                        }

                    } catch (e) {
                        console.log("error al borrar venta", e)
                    }
                }
            })
        }

    }, [online, ventas])







    return (<OnlineContext.Provider value={{
        online
    }}>

        {children}
    </OnlineContext.Provider>
    )
}

