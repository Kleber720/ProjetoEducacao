import {Module} from "../models/entities/Module"

export interface ModuleRepository{
    createModule(module:Module): Promise <Module>
    getModuleById(id:number): Promise <Module | null>
    getModuleByIdActivities(activities:number): Promise <Module | null>
    deleteModuleById(id:number): Promise <void>
    updateModuleById(id:number, module: Module): Promise <Module | null>
}