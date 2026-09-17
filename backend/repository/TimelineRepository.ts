import {Timeline} from "../models/entities/Timeline"

export interface TimelineRepository{
    createTimeline(timeline:Timeline): Promise <any>
    searchTimelineById(id:number): Promise <any>
    searchTimelineByIdModule(module:number): Promise <any>
    deleteTimelineById(id:number): Promise <void>
    updateTimelineById(id:number, timeline:Timeline): Promise <any>
}
