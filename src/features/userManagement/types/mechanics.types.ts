import { Location, Response } from "@/types";
  
export interface Mepa {
    id: number;
    Mepa_ID: string;
    User_ID: string;
    address: string;
    shop_name: string;
    location: Location;
    status: number;
    date_added: string;
}

export type MepaStats = {
    totalMechanics: number;
    activeMechanics: number;
    inactiveMechanics: number;
}

export type CreateMepaDTO = Pick<Mepa, 'shop_name' | 'address' | 'location' | 'User_ID'>;
  

export type RegisterMepaResponse = Response<Mepa>;


export type MepaListResponse = Response<Mepa[]>;