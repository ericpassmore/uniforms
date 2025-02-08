export interface CookieData {
    id: number;
    token: string;
}

export interface UniformsListInterface {
    id: number;
    jerseyNumber: number;
    jerseySize: string;
    hasShorts: boolean;
    pinnieNumber: number;
    pinnieSize: string;
    hasPinnie: boolean;
    firstName: string;
    lastName: string;
    email: string;
    userId: number;
    validateInStock: boolean;
}

export interface EquipmentIdInterface {
    id: number;
}