import {Module} from "./Module";

export class Timeline{
    private id:number;
    private name:string;
    private description?:string;
    private Module:Module;
    startDate:Date;
    endDate:Date;

    constructor(id:number,name:string,Module:Module,startDate:Date,endDate:Date,description?:string){
        this.id=id
        this.name=name
        this.Module=Module
        this.startDate=startDate
        this.endDate=endDate
        this.description=description
    }

    getId():number{
        return this.id
    }

    getName():string{
        return this.name
    }

    setName(name:string):void{
        this.name=name
    }

    getDescription():string|undefined{
        return this.description
    }

    setDescription(description:string):void{
        this.description=description
    }

    getModule():Module{
        return this.Module
    }

    getStartDate():Date{
        return this.startDate
    }

    setStartDate(startDate:Date):void{
        this.startDate=startDate
    }

    getEndDate():Date{
        return this.endDate
    }

    setEndDate(endDate:Date):void{
        this.endDate=endDate
    }
    

}