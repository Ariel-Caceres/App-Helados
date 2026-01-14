import { createContext, useEffect, useState, type ReactNode } from "react";
import { useSell } from "../hooks/useSell";
import type { Venta } from "../types/venta.entity";
import { useBuy } from "../hooks/useBuy";

interface OnlineContextInterface {
    online: boolean
}

export const OnlineContext = createContext<OnlineContextInterface | undefined>(undefined);

export const OnlineProvider = ({ children }: { children: ReactNode }) => {

    const { ventas, setVentas } = useSell()
    const { compras, setCompras } = useBuy()
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
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/sales`, {
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
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/sales/${v.id}`, {
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
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/sales/${v.id}`, {
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


    useEffect(() => {
        if (online && compras != undefined) {
            compras.forEach(async (c) => {
                if (c.status == "pending-create") {
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/purchases`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(c)
                        })
                        if (!res.ok) {
                            console.log("error al crear compra");
                        } else {
                            setCompras(prev => {
                                return prev.map(p => {
                                    return p.id == c.id ?
                                        { ...p, status: "synced" } :
                                        p
                                })
                            })
                            console.log("Compra creada con éxito");

                        }
                    } catch (e) {
                        console.log("error al crear compra", e);

                    }
                }
                if (c.status == "pending-update") {
                    console.log("compra a editar ", c.id)
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/purchases/${c.id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(c)
                        })
                        if (!res.ok) {
                            console.log("Error al editar la compra", "compra en cuestión", c);

                        } else {
                            console.log("Compra editada con éxito", c.id);
                            setCompras(prev => {
                                return prev.map(p => {
                                    return p.id == c.id ?
                                        { ...p, status: "synced" }
                                        : p
                                })
                            })
                        }
                    } catch (e) {
                        console.log("Error al editar la venta", "venta id:", c.id, e)
                    }

                }
                if (c.status == "pending-delete") {
                    try {
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/purchases/${c.id}`, {
                            method: "DELETE"
                        })
                        if (!res.ok) {
                            console.log("Error al eliminar la compra", c.id);
                        } else {
                            console.log("Compra eliminada exitosamente", c.id);
                            const compraBorradaParaSiempre = compras.filter(compra =>
                                compra.id != c.id
                            )
                            setCompras(compraBorradaParaSiempre)
                        }
                    } catch (e) {
                        console.log(e);

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

