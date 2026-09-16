import {Module} from "../models/entities/Module"

export interface ModuleRepository{
    createModule(module:Module): Promise <any>
    getModuleById(id:number): Promise <any>
    getModuleByIdActivities(activities:number): Promise <any>
    deleteModuleById(id:number): Promise <void>
    updateModuleById(id:number, module: Module): Promise <any>
}