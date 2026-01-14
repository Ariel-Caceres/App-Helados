import { useContext } from "react";
import { BuyContext } from "../context/BuyContext";

export const useBuy = () => {
    const context = useContext(BuyContext);
    if (context === undefined) {
        throw new Error("useBuy debe usarse dentro de un AppProvider");
    }
    return context;
};