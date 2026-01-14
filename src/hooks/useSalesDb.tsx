import { useContext } from "react";
import { SalesDb } from "../context/salesDbContext";

export const useSalesDb = () => {
    const context = useContext(SalesDb);
    if (context === undefined) {
        throw new Error("useSalesDb debe usarse dentro de un contexto correcto");
    }
    return context;
};