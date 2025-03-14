import { User, Response } from "@/types";

export type VehicleType = 'CAR' | 'TRUCK' | 'MOTORCYCLE';

  
export interface Vehicle {
    id: number;
    Vehicle_ID: string;
    User_ID: string;
    added_by: string;
    Deliver_ID: string;
    type: string;
    model: string;
    front_image_url: string | null;
    front_image_obj: any | null;
    back_image_url: string | null;
    back_image_obj: any | null;
    color: string;
    registrationNumber: string;
    date_added: string;
    location: string | null;
    status: number;
    user: User;
}

export type VehicleStats = {
    totalVehicles: number;
    activeVehicles: number;
    inactiveVehicles: number;
}
  

export type CreateVehicleDTO = Pick<Vehicle, 'User_ID' | 'Deliver_ID' | 'type' | 'model' | 'color' | 'registrationNumber'>;


export type RegisterRiderVehicleResponse = Response<Vehicle>;


export type VehicleListResponse = Response<Vehicle[]>;