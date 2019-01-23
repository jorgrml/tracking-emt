
export interface Coordinates {
    lat: number;
    lng: number;
}
export interface Track {
    codBus: string;
    path: Coordinates[];
}