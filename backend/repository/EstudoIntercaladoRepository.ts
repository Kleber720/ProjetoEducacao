import {EstudoIntercaladoEntities} from "../models/entities/EstudoIntercaladoEntities"

export interface EstudoIntercaladoRepository{

    createEstudoIntercaladoRepository(Promise: EstudoIntercaladoEntities): Promise <any>;
    updateEstudoIntercaladoRepository(Promise: EstudoIntercaladoEntities): Promise <any>;
    searchEstudoIntercaladoRepositoryById(id:Number): Promise<any>;
    searchEstudoIntercaladoRepositoryByUser(idUser:Number): Promise <any>;
    deleteEstudoIntercaladoRepositoryById(id:Number): Promise <any>
    
}