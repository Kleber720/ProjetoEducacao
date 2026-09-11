import {MindMapEntities} from "../models/entities/MindMap"


export interface MapaMentalRepository{
        
    createMapaMental(Promise: MindMapEntities): Promise <any>;
    updateMapaMental(Promise: MindMapEntities): Promise <any>;
    searchMapaMentalById( id: Number): Promise <any>;
    searchMapaMentalByUser(idUser: Number): Promise <any>;
    deleteMapaMentalByid(id:Number): Promise <any>;

}