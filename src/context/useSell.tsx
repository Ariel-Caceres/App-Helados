import { useContext } from "react";
import { SellContext } from "./SellContext";

export const useSell = () => {
    const context = useContext(SellContext);
    if (context === undefined) {
        throw new Error("useApp debe usarse dentro de un AppProvider");
    }
    return context;
};