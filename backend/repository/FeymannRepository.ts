import { FeymannEntities } from "../models/entities/FeymannEntities";

export interface FeymannRepository{
    
    createFeymann(Promise: FeymannEntities): Promise <any>;
    updateFeymann(Promise:FeymannEntities): Promise <any>;
    searchFeymannBtId(id:Number): Promise <any>;
    searchFeymannByUser(idUser:Number): Promise <any>;
    deleteFeymannById(id:Number): Promise <any>

}