import { useContext } from "react";
import { OnlineContext } from "./OnlineContext";

export const useOnline = () => {
    const context = useContext(OnlineContext);
    if (context === undefined) {
        throw new Error("useApp debe usarse dentro de un AppProvider");
    }
    return context;
};