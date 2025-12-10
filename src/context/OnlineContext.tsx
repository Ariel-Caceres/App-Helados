import { createContext, useEffect, useState, type ReactNode } from "react";


interface OnlineContextInterface {
    online: boolean
}

export const OnlineContext = createContext<OnlineContextInterface | undefined>(undefined);

export const OnlineProvider = ({ children }: { children: ReactNode }) => {
    const [online, SetOnline] = useState<boolean>(navigator.onLine)

    useEffect(() => {
        const handleChange = () => SetOnline(navigator.onLine)
        window.addEventListener("online", handleChange)
        window.addEventListener("offline", handleChange)

        window.removeEventListener("online", handleChange)
        window.removeEventListener("offline", handleChange)

    }, [])


    return (<OnlineContext.Provider value={{
        online
    }}>

        {children}
    </OnlineContext.Provider>
    )
}

