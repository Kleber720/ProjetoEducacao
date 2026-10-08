import type { Cornell } from "../models/entities/Cornell";
import type { createCornellDTO } from "../models/dto/cornell/createCornellDTO";

export interface CornellRepository {
    createCornell(cornell: Cornell): Promise<number>;
    searchCornellByUserId(userId: number): Promise<createCornellDTO[]>;
}
