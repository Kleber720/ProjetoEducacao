import {Timeline} from "../models/entities/Timeline"

export interface TimelineRepository{
    createTimeline(timeline:Timeline): Promise <any>
    getTimelineById(id:number): Promise <any>
    getTimelineByIdModule(module:number): Promise <any>
    deleteTimelineById(id:number): Promise <void>
    updateTimelineById(id:number, timeline:Timeline): Promise <any>
}
