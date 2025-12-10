import { useContext } from "react";
import { BuyContext } from "./BuyContext";

export const useBuy = () => {
    const context = useContext(BuyContext);
    if (context === undefined) {
        throw new Error("useApp debe usarse dentro de un AppProvider");
    }
    return context;
};