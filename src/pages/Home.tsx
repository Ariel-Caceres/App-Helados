import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useSell } from "../context/useSell"
import { useOnline } from "../context/useOnline"
import { Button } from "../components/Button"
import { v4 as uuidv4 } from 'uuid';
import type { UUID } from "../types/uuid"
import type { Venta } from "../types/venta.entity"
import { useState } from "react"
export const Home = () => {
    const navigate = useNavigate()
    const { ventas, hoy } = useSell()
    const online = useOnline()
    const ventasHoy = ventas.filter(v => {
        return v.fecha.split("-")[2] == hoy.split("-")[2]
    })
    const DineroHoy = ventasHoy.reduce((acc, v) => v.status !== "pending-delete" ? acc + v.precioTotal : acc, 0)
    const ventasHoyCant = ventasHoy.reduce((acc, va) => va.status !== "pending-delete" ? acc + va.cantidad : acc, 0);

    const [migrating, setMigrating] = useState(false);
    const [migrationDone, setMigrationDone] = useState(false);
    const [migrationError, setMigrationError] = useState<string | null>(null);















    function migrateVentaLegacy(v: any): Venta {


        return {
            id: v.id ?? uuidv4() as UUID,
            precio: v.precio ?? 0,
            cantidad: v.cantidad ?? 1,
            precioTotal: v.precioTotal ?? (v.precio ?? 0) * (v.cantidad ?? 1),
            fecha: v.fecha,
            status: "pending-create",
            producto: "helado"
        }
    }
    async function migrateAndUploadVentas() {
        setMigrating(true);
        setMigrationDone(false);
        setMigrationError(null);

        try {
            const raw = localStorage.getItem("ventas");
            if (!raw) {
                throw new Error("No hay ventas en el dispositivo");
            }

            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                throw new Error("Formato inválido de ventas");
            }

            const ventasMigradas: Venta[] = parsed.map(migrateVentaLegacy);

            for (const venta of ventasMigradas) {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/sales`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(venta),
                    }
                );

                if (!res.ok) {
                    throw new Error("Error subiendo una venta");
                }

                venta.status = "synced";
            }

            localStorage.setItem("ventas", JSON.stringify(ventasMigradas));
            setMigrationDone(true);

        } catch (err: any) {
            setMigrationError(err.message ?? "Error desconocido");
        } finally {
            setMigrating(false);
        }
    }








    return (
        <div className="w-full  max-w-3xl mx-auto  flex mt-[5vh]  flex-col gap-10 px-2 overflow-hidden ">

            <Header />

            <div className="w-full border flex bg-[#DAF5FF] rounded-2xl   flex-col justify-evenly relative py-6">

                <div className="absolute border top-0 left-0 gap-x-10 gap-y-3 right-0 flex flex-wrap w-full  items-center justify-between   bg-amber-200 rounded-2xl px-6 py-4 ">

                    <div className="text-2xl whitespace-nowrap md:text-3xl font-medium">
                        {online ? <i className="fa-solid fa-chart-simple"></i> : "📊"}
                        <span>
                            Panel diario
                        </span>
                    </div>

                    <div className=" justify-end flex items-end ">
                        <button className="text-xl text-end whitespace-nowrap sm:text-2xl font-medium self-end justify-self-end border-2 rounded-2xl cursor-pointer p-1" onClick={() => navigate("/record")}>
                            {online ? <i className="fa-regular fa-calendar-days"></i> : "📆"}
                            <span className=""> Ver historial</span>
                        </button>
                    </div>
                </div>

                <div className="w-full flex flex-row md:flex-row justify-evenly gap-4 mt-16 px-2">

                    {/* Venta hoy */}
                    <div className="w-1/2 md:w-1/3  
          bg-[#FFBFA0] 
          min-h-32 md:h-40 
          rounded-2xl flex flex-col 
          border-2 shadow-md
          p-4
        ">
                        <div className="w-full flex justify-center items-center text-xl md:text-2xl font-medium">
                            {online ? <i className="fa-solid fa-cash-register text-3xl"></i> : "🧊"}
                            <span className="">
                                Ventas hoy:
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center flex-1">
                            <span className="text-4xl font-bold animate-pulse">{ventasHoyCant}</span>
                        </div>
                    </div>

                    {/* Dinero hoy */}
                    <div className="
          w-1/2 md:w-1/3  
          bg-[#87F6FF] 
          min-h-32 md:h-40 
          rounded-2xl flex flex-col 
          border-2 shadow-md
          p-4
        ">
                        <div className="w-full flex justify-center items-center text-xl md:text-2xl font-medium">
                            {online ? <i className="fa-regular fa-money-bill-1 text-3xl"></i> : "💸"}
                            <span className="">
                                Dinero hoy:
                            </span>
                        </div>
                        <div className="w-full flex justify-center items-center flex-1">
                            <span className="text-4xl font-bold animate-pulse">${DineroHoy}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" border bg-[#DAF5FF] rounded-2xl flex items-center flex-col justify-evenly relative py-6 max-h-[30vh] overflow-auto">
                <button
                    onClick={migrateAndUploadVentas}
                    disabled={migrating}
                    className="border-2 w-[25vh] p-2 rounded-2xl disabled:opacity-50"
                >
                    {migrating ? "Migrando..." : "Migrar ventas a la DB"}
                </button>

                {migrationDone && (
                    <span className="mt-2 text-green-700 font-medium">
                        ✅ Migración completada
                    </span>
                )}

                {migrationError && (
                    <span className="mt-2 text-red-600 font-medium">
                        ❌ {migrationError}
                    </span>
                )}


            </div>

            <div
                className="
    w-[98%]
    flex flex-col-reverse
    justify-center
    items-center
    gap-4

    absolute bottom-[10vh]

    sm:static
    sm:flex-row
    sm:gap-10
    sm:justify-evenly
  "
            >
                <Button tipo="button" texto={"Comprar"} onClick={() => navigate("/buy")} />
                <Button tipo="button" texto={"Vender"} onClick={() => navigate("/sell")} />
            </div>

        </div>
    );

}