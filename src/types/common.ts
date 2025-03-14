export interface Location {
    type: string;
    coordinates: [number, number]; // Tuple representing longitude and latitude
}

export interface Response<T> {
    status: number;
    message: string;
    data: T;
}