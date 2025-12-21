
import { createContext, useEffect, useState, } from "react";


export interface Venta {
    id?: string,
    precio: number;
    precioTotal: number;
    cantidad: number;
    fecha: string;
    onDb: boolean
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
    // const [orden, setOrden] = useState("")s
    const [ventas, setVentas] = useState<Venta[]>(() => {
        const data = (localStorage.getItem("ventas"))
        if (data) {
            const ventasCargadas: Venta[] = JSON.parse(data);
            const ventasMigradas: Venta[] = ventasCargadas.map((venta: Venta) => ({
                ...venta,
                precioTotal: venta.precioTotal || (venta.precio * venta.cantidad),
                onDb: venta.onDb || false
            }));
            const ventasOrdenadas = [...ventasMigradas].sort((a, b) =>
                Number(b.cantidad) - Number(a.cantidad)
            )
            console.log(ventasOrdenadas)
            return ventasOrdenadas;
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
            precioTotal: precioTotal,
            onDb: false
        };


        setVentas([...ventas, nuevaVenta]);

        setPrecio(precio);
        setCantidad("");
    };

    // useEffect(() => {
    //     const traerVentasDb = async () => {
    //         try {
    //             const res = await fetch("https://app-helados-backend.onrender.com/sales")
    //             if (res.ok) {
    //                 console.log("Fetch exitoso")
    //             }
    //             const data = await res.json()
    //             console.log(data.ventas)
    //             setVentas(data.ventas)
    //         } catch (e) {
    //             console.log("Error al traer los productos de la base de datos", e)
    //         }
    //     }
    //     traerVentasDb()
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
                precioTotal
            }}
        >
            {children}
        </SellContext.Provider>
    );
};
