import { useContext } from "react";
import { SellContext } from "./SellContext";

export const useSell = () => {
    const context = useContext(SellContext);
    if (context === undefined) {
        throw new Error("SellContext debe usarse dentro de un SellContext");
    }
    return context;
};