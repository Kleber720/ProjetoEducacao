import { CornellEntities } from "../models/entities/CornellEntities";

export interface CornellRepository{

    createCornell(Promise: CornellEntities): Promise <any>;
    updateCornell(Promise:CornellEntities): Promise <any>;
    searchCornellById(id: Number): Promise <any>;
    searchCornellByUser(idUser: Number): Promise <any>;
    deleteCornellById(id: Number): Promise <any>
    
}