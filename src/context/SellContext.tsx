
import { createContext, useEffect, useState, type ReactNode } from "react";


export interface Venta {
    precio: number;
    precioTotal: number;
    cantidad: number;
    fecha: string;
}

interface SellContextType {
    precio: number;
    cantidad: string;
    ventas: Venta[];
    setPrecio: (value: number) => void;
    setCantidad: (value: string) => void;
    registrarVenta: () => void;
    hoy: string,
    precioTotal: number
    setVentas: (venta: Venta[]) => void;
}

export const SellContext = createContext<SellContextType | undefined>(undefined);

export const SellProvider = ({ children }: { children: ReactNode }) => {
    const [precio, setPrecio] = useState<number>(() => {
        const precioAntiguo = localStorage.getItem("precio")
        if (!precioAntiguo) {
            return 300
        }
        return JSON.parse(precioAntiguo)
    });
    const [cantidad, setCantidad] = useState<string>("");
    const [ventas, setVentas] = useState<Venta[]>(() => {
        const data = (localStorage.getItem("ventas"))
        if (data) {
            const ventasCargadas = JSON.parse(data);
            // Migración: agregar precioTotal a ventas antiguas que no lo tengan
            const ventasMigradas = ventasCargadas.map((venta: Venta) => ({
                ...venta,
                precioTotal: venta.precioTotal || (venta.precio * venta.cantidad)
            }));
            return ventasMigradas;
        }
        return []

    });
    const precioTotal = (Number(precio) * Number(cantidad))

    const d = new Date();
    const año = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");

    const hoy = `${año}-${mes}-${dia}`;


    const registrarVenta = () => {
        const nuevaVenta: Venta = {
            precio: precio,
            cantidad: Number(cantidad),
            fecha: hoy,
            precioTotal: precioTotal
        };


        setVentas([...ventas, nuevaVenta]);

        setPrecio(precio);
        setCantidad("");
    };

    useEffect(() => {
        localStorage.setItem("ventas", JSON.stringify(ventas))
    }, [ventas])

    useEffect(() => {
        localStorage.setItem("precio", JSON.stringify(precio));
    }, [precio]);


    return (
        <SellContext.Provider
            value={{
                precio,
                cantidad,
                ventas,
                setPrecio,
                setCantidad,
                registrarVenta,
                hoy,
                setVentas,
                precioTotal
            }}
        >
            {children}
        </SellContext.Provider>
    );
};
