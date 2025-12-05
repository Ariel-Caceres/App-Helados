
import { createContext, useEffect, useState, type ReactNode } from "react";

interface Venta {
    precio: number;
    sabor: string;
    cantidad: number;
    fecha: string;
}

interface SellContextType {
    precio: string;
    cantidad: string;
    sabor: string;
    ventas: Venta[];
    setPrecio: (value: string) => void;
    setCantidad: (value: string) => void;
    setSabor: (value: string) => void;
    registrarVenta: () => void;
}

export const SellContext = createContext<SellContextType | undefined>(undefined);

export const SellProvider = ({ children }: { children: ReactNode }) => {
    const [precio, setPrecio] = useState<string>("");
    const [sabor, setSabor] = useState<string>("");
    const [cantidad, setCantidad] = useState<string>("");
    const [ventas, setVentas] = useState<Venta[]>(() => {
        const data = (localStorage.getItem("ventas"))
        if (data) {
            return JSON.parse(data)
        }
        return []

    });

    const hoy = new Date().toLocaleDateString("sv-SE");



    const registrarVenta = () => {
        const nuevaVenta: Venta = {
            precio: Number(precio),
            sabor,
            cantidad: Number(cantidad),
            fecha: hoy,
        };


        setVentas([...ventas, nuevaVenta]);

        setPrecio("");
        setCantidad("");
        setSabor("");
    };

    useEffect(() => {
        localStorage.setItem("ventas", JSON.stringify(ventas))
    }, [ventas])


    return (
        <SellContext.Provider
            value={{
                precio,
                cantidad,
                sabor,
                ventas,
                setPrecio,
                setCantidad,
                setSabor,
                registrarVenta,
            }}
        >
            {children}
        </SellContext.Provider>
    );
};
