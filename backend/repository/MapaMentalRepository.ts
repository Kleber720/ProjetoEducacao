import {MapaMentalEntities} from "../models/entities/MapaMentalEntities"


export interface MapaMentalRepository{
        
    createMapaMental(Promise: MapaMentalEntities): Promise <any>;
    updateMapaMental(Promise: MapaMentalEntities): Promise <any>;
    searchMapaMentalById( id: Number): Promise <any>;
    searchMapaMentalByUser(idUser: Number): Promise <any>;
    deleteMapaMentalByid(id:Number): Promise <any>;

}