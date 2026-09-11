import {InterleavedStudy} from "../models/entities/interleavedStudy"

export interface EstudoIntercaladoRepository{

    createEstudoIntercaladoRepository(Promise: InterleavedStudy): Promise <any>;
    updateEstudoIntercaladoRepository(Promise: InterleavedStudy): Promise <any>;
    searchEstudoIntercaladoRepositoryById(id:Number): Promise<any>;
    searchEstudoIntercaladoRepositoryByUser(idUser:Number): Promise <any>;
    deleteEstudoIntercaladoRepositoryById(id:Number): Promise <any>
    
}