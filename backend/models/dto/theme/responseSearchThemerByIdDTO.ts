export interface responseSearchThemerByIdDTO {
    name: string;
    description?: string;
    category:{
        id: number;
        name: string;
    }
}