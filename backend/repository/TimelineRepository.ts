import {Timeline} from "../models/entities/Timeline"

export interface TimelineRepository{
    createTimeline(timeline:Timeline): Promise <Timeline>
    getTimelineById(id:number): Promise <Timeline | null>
    getTimelineByIdModule(module:number): Promise <Timeline | null>
    deleteTimelineById(id:number): Promise <void>
    updateTimelineById(id:number, timeline:Timeline): Promise <Timeline | null>
}
