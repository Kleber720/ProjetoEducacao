import { Activities } from "../models/entities/Activities";

export interface ActivitiesRepository{
    createActivities(activities:Activities): Promise <Activities>
    getActivitiesById(id:number): Promise <Activities | null>
    getActivitiesByIdTheme(theme:number): Promise <Activities | null>
    deleteActivitiesById(id:number): Promise <void>
    updateActivitiesById(id:number, activities:Activities): Promise <Activities | null>
}