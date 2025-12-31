import type { UUID } from "./uuid";

export interface Venta {
    id: UUID,
    precio: number;
    precioTotal: number;
    cantidad: number;
    fecha: string;
    status: "synced" | "pending-create" | "pending-delete" | "pending-update"
}