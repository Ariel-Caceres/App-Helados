import type { UUID } from "./uuid";

export interface Compra {
    id: UUID
    precio: number;
    cantidad: number;
    fecha: string;
    status: "synced" | "pending-create" | "pending-delete" | "pending-update"

}