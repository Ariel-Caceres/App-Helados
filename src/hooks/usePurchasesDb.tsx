import { useContext } from "react";
import { PurchasesContext } from "../context/PurchasesDbContext";

export const usePurchases = () => {
    const context = useContext(PurchasesContext);
    if (context === undefined) {
        throw new Error("usePurchases debe usarse dentro de un contexto correcto");
    }
    return context;
};