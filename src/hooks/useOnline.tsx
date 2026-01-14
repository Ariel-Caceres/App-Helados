import { useContext } from "react";
import { OnlineContext } from "../context/OnlineContext";

export const useOnline = () => {
    const context = useContext(OnlineContext);
    if (context === undefined) {
        throw new Error("OnlineContext debe usarse dentro de un SellContext");
    }
    return context;
};