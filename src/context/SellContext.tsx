
import { v4 as uuidv4 } from 'uuid';
import { createContext, useEffect, useState, type ReactNode, } from "react";
import type { UUID } from '../types/uuid';
import type { Venta } from '../types/venta.entity';
export type Producto = "helado" | "pollo-trozado" | "carne-picada" | "hielo"

export type Precios = Record<Producto, number>;

interface SellContextType {
    precios: Precios;
    cantidad: string;
    ventas: Venta[];
    setPrecios: React.Dispatch<React.SetStateAction<Precios>>
    setCantidad: (value: string) => void;
    registrarVenta: () => void;
    hoy: string;
    precioTotal: number;
    setVentas: React.Dispatch<React.SetStateAction<Venta[]>>;

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
                "pollo-trozado": 2700,
                "carne-picada": 2000,
                "hielo": 500
            };
        }
        return JSON.parse(guardado);
    });

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



    const productoFinal = producto ?? "helado";
    const precioUnitario = precios[productoFinal];
    const precioTotal = precioUnitario * Number(cantidad);


    const registrarVenta = () => {
        const nuevaVenta: Venta = {
            producto: producto,
            id: uuidv4() as UUID,
            precio: Number(precioUnitario),
            cantidad: Number(cantidad),
            fecha: hoy,
            precioTotal: precioTotal,
            status: "pending-create"
        };


        setVentas([...ventas, nuevaVenta]);

        setPrecios(precios);
        setCantidad("");
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
                precios,
                cantidad,
                ventas,
                setPrecios,
                setCantidad,
                registrarVenta,
                hoy,
                setVentas,
                precioTotal,
                producto,
                setProducto
            }}
        >
            {children}
        </SellContext.Provider>
    );
};
