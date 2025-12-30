import { createContext, useEffect, useState, type ReactNode } from "react";
import { useSell } from "./useSell";
import type { Venta } from "./SellContext";

interface OnlineContextInterface {
    online: boolean
}

export const OnlineContext = createContext<OnlineContextInterface | undefined>(undefined);

export const OnlineProvider = ({ children }: { children: ReactNode }) => {

    const { ventas, setVentas } = useSell()

    const [online, setOnline] = useState<boolean>(true)


    useEffect(() => {
        const handleChange = () => setOnline(true)
        window.addEventListener("online", handleChange)
        window.addEventListener("offline", handleChange)

        window.removeEventListener("online", handleChange)
        window.removeEventListener("offline", handleChange)

    }, [])
    console.log(online)

    useEffect(() => {
        if (online && ventas != undefined) {
            ventas.forEach(async (v) => {
                if (v.status == "pending-create") {
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

                            console.log("cambiando el status")
                            setVentas(prev => {
                                return prev.map((venta: Venta) => {
                                    return venta.id === v.id
                                        ? { ...venta, status: "synced" }
                                        : venta
                                })
                            })

                            console.log("Venta agregada a la base de datos exitosamente", v)
                        }
                    } catch (e) {
                        console.log("Error al enviar la venta a la base de datos", "venta en cuestión:", v, "Error:", e)
                    }
                }

                if (v.status == "pending-update") {
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
                            setVentas(prev => {
                                return prev.map((venta: Venta) => {
                                    return venta.id === v.id
                                        ? { ...venta, status: "synced" }
                                        : venta
                                })
                            })
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

    }, [online])







    return (<OnlineContext.Provider value={{
        online
    }}>

        {children}
    </OnlineContext.Provider>
    )
}

