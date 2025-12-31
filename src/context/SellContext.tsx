
import { v4 as uuidv4 } from 'uuid';
import { createContext, useEffect, useState, type ReactNode, } from "react";
import type { UUID } from '../types/uuid';
import type { Venta } from '../types/venta.entity';

interface SellContextType {
    precio: string;
    cantidad: string;
    ventas: Venta[];
    setPrecio: (value: string) => void;
    setCantidad: (value: string) => void;
    registrarVenta: () => void;
    hoy: string,
    precioTotal: number
    setVentas: React.Dispatch<React.SetStateAction<Venta[]>>;
    setOrden: (orden: string) => void,
    orden: string
}

export const SellContext = createContext<SellContextType | undefined>(undefined);

export const SellProvider = ({ children }: { children: ReactNode }) => {
    const [precio, setPrecio] = useState<string>(() => {
        const precioAntiguo = localStorage.getItem("precio")
        if (!precioAntiguo) {
            return 300
        }
        return JSON.parse(precioAntiguo)
    });
    const [cantidad, setCantidad] = useState<string>("");
    const [orden, setOrden] = useState("")
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
    // const [ventasDb, setVentasDb] = useState()
    const precioTotal = (Number(precio) * Number(cantidad))
    const d = new Date();
    const año = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    const hoy = `${año}-${mes}-${dia}`;

    useEffect(() => {

        const ventasOrdenadas = ventas.sort((a, b) =>
            orden == "cantidad Des" ?
                Number(a.cantidad) - Number(b.cantidad) :
                orden == "cantidad Asd" ?
                    Number(b.cantidad) - Number(a.cantidad) :
                    orden == "precioTotal Des" ?
                        Number(a.precioTotal) - Number(b.precioTotal) :
                        orden == "precioTotal Asd" ?
                            Number(b.precioTotal) - Number(a.precioTotal) :
                            orden == "fecha Asd" ?
                                Number(a.fecha.split("-")[2]) - Number(b.fecha.split("-")[2]) :
                                orden == "fecha Des" ?
                                    Number(b.fecha.split("-")[2]) - Number(a.fecha.split("-")[2]) :
                                    Number(a.fecha.split("-")[2]) - Number(b.fecha.split("-")[2])


        )
        setVentas(ventasOrdenadas)

    }, [orden])

    const registrarVenta = () => {
        const nuevaVenta: Venta = {
            id: uuidv4() as UUID,
            precio: Number(precio),
            cantidad: Number(cantidad),
            fecha: hoy,
            precioTotal: precioTotal,
            status: "pending-create"
        };


        setVentas([...ventas, nuevaVenta]);

        setPrecio(precio);
        setCantidad("");
    };

    // useEffect(() => {
    //     const traerVentasDb = async (mes: string) => {
    //         try {
    //             const res = await fetch(`${import.meta.env.VITE_API_URL}/sales/${mes}`)
    //             if (!res.ok) {
    //                 console.log("Error al traer los productos de la base de datos")
    //             } else {
    //                 console.log("Fetch exitoso")
    //             }
    //             const data = await res.json()
    //             setVentasDb(data)
    //         } catch (e) {
    //             console.log("Error al traer los productos de la base de datos", e)
    //         }
    //     }
    //     traerVentasDb(mes)
    // }, [])

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
                precioTotal,
                orden,
                setOrden
            }}
        >
            {children}
        </SellContext.Provider>
    );
};
