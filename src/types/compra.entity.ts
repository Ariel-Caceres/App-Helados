import type { UUID } from "./uuid";

export interface Compra {
    producto?: string,
    id: UUID
    precio: number;
    cantidad: number;
    fecha: string;
    status: "synced" | "pending-create" | "pending-delete" | "pending-update"

}