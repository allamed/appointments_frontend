// types.ts

export interface Appointment {
    id: number;
    title: string;
    type: string;
    location?: string;
    host: Vendor;
    client: Buyer;
    startTime: Date;
    endTime: Date;
}

export interface Buyer {
    id: number;
    name: string;
    companyName: string;
}

export interface Vendor {
    id: number;
    name: string;
}

