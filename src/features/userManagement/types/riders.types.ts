import { Location, Response } from "@/types";

export interface Rider {
    id: number;
    Deliver_ID: string;
    User_ID: string;
    added_by: string;
    licenseNumber: string;
    front_license_url: string | null;
    back_license_url: string | null;
    front_license_obj: any | null; // Adjust `any` if there's a specific structure
    back_license_obj: any | null;  // Adjust `any` if there's a specific structure
    location: Location;
    status: number;
    date_added: string; // ISO date string
}

export type RiderStats = {
    totalRiders: number;
    activeRiders: number;
    inactiveRiders: number;
}

export type CreateRiderDTO = Pick<Rider, 'licenseNumber' | 'User_ID' | 'location'>;

export type RegisterRiderResponse = Response<Rider>;

export type RiderListResponse = Response<Rider[]>;