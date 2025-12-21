import { createContext, useEffect, useState, type ReactNode } from "react";
import { useSell } from "./useSell";


interface OnlineContextInterface {
    online: boolean
}

export const OnlineContext = createContext<OnlineContextInterface | undefined>(undefined);

export const OnlineProvider = ({ children }: { children: ReactNode }) => {
    const [online, SetOnline] = useState<boolean>(navigator.onLine)
    const { ventas } = useSell()




    useEffect(() => {
        const handleChange = () => SetOnline(navigator.onLine)
        window.addEventListener("online", handleChange)
        window.addEventListener("offline", handleChange)

        window.removeEventListener("online", handleChange)
        window.removeEventListener("offline", handleChange)

    }, [])




    useEffect(() => {
        if (online && ventas != undefined) {
            ventas.forEach(async (v) => {
                if (v.onDb == false) {
                    try {
                        v.onDb = true
                        const res = await fetch(`https://app-helados-backend.onrender.com/sell`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(v)
                        })
                        if (res.ok) {
                            console.log("Venta agregada a la base de datos exitosamente", v)
                        } else {
                            console.log("Error al enviar la venta a la base de datos", "venta en cuestión:", v)
                        }
                    } catch (e) {
                        console.log("Error al enviar la venta a la base de datos", "venta en cuestión:", v, "Error:", e)
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

