
import { v4 as uuidv4 } from 'uuid';
import { createContext, useEffect, useState, type ReactNode, } from "react";
import type { UUID } from '../types/uuid';
import type { Venta } from '../types/venta.entity';

export type Producto = "helado" | "pollo-trozado" | "carne-picada" | "pollo-entero" | "papa" | "zanahoria" | "cebolla"

export type Precios = Record<Producto, number>;

interface SellContextType {
    precios: Precios;
    cantidad: string;
    ventas: Venta[];
    setPrecios: React.Dispatch<React.SetStateAction<Precios>>
    setCantidad: (value: string) => void;
    registrarVenta: () => void;
    hoy: string;
    setVentas: React.Dispatch<React.SetStateAction<Venta[]>>;
    totalManual: number | null
    totalSugerido: number
    setTotalManual: (valor: number | null) => void
    producto: Producto;
    setProducto: (value: Producto) => void;
}


export const SellContext = createContext<SellContextType | undefined>(undefined);

export const SellProvider = ({ children }: { children: ReactNode }) => {
    const [precios, setPrecios] = useState<Precios>(() => {
        const guardado = localStorage.getItem("precios");
        if (!guardado) {
            return {
                helado: 300,
                "pollo-trozado": 3400,
                "carne-picada": 3000,
                "pollo-entero": 3800,
                "zanahoria": 1000,
                "papa": 900,
                "cebolla": 800
            };
        }
        return JSON.parse(guardado);
    });
    const [totalManual, setTotalManual] = useState<number | null>(null);

    const [cantidad, setCantidad] = useState<string>("");
    const [ventas, setVentas] = useState<Venta[]>(() => {
        const data = (localStorage.getItem("ventas"))
        if (data) {
            const ventasCargadas: Venta[] = JSON.parse(data);
            const ventasMigradas: Venta[] = ventasCargadas.map((v: Venta) => ({
                ...v,
                status: v.status || "pending-create"
            }))
            return ventasMigradas;
        }
        return []

    });
    const [producto, setProducto] = useState<Producto>("helado")
    const d = new Date();
    const año = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    const hoy = `${año}-${mes}-${dia}`;


    const precioUnitario = precios[producto];
    const totalSugerido = precioUnitario * Number(cantidad);

    const totalFinal =
        totalManual !== null ? totalManual : totalSugerido;

    const registrarVenta = () => {
        const nuevaVenta: Venta = {
            id: uuidv4() as UUID,
            producto: producto,
            precio: precioUnitario,
            cantidad: Number(cantidad),
            fecha: hoy,
            precioTotal: totalFinal,
            status: "pending-create"
        };

        setVentas(prev => [...prev, nuevaVenta]);
        setCantidad("");
        setTotalManual(null);
    };




    useEffect(() => {
        localStorage.setItem("ventas", JSON.stringify(ventas))
    }, [ventas])

    useEffect(() => {
        localStorage.setItem("precios", JSON.stringify(precios));
    }, [precios]);







    return (
        <SellContext.Provider
            value={{
                setTotalManual,
                totalManual,
                totalSugerido,
                precios,
                cantidad,
                ventas,
                setPrecios,
                setCantidad,
                registrarVenta,
                hoy,
                setVentas,
                producto,
                setProducto
            }}
        >
            {children}
        </SellContext.Provider>
    );
};
