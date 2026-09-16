import { Activities } from "../models/entities/Activities";

export interface ActivitiesRepository{
    createActivities(activities:Activities): Promise <Activities>
    getActivitiesById(id:number): Promise <any>
    getActivitiesByIdTheme(theme:number): Promise <any>
    deleteActivitiesById(id:number): Promise <void>
    updateActivitiesById(id:number, activities:Activities): Promise <any>
}