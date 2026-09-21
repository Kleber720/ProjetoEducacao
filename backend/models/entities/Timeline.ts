import {Module} from "./Module";

export class Timeline{
    private id?:number;
    private name:string;
    private description?:string;
    private module:Module;
    private startDate:Date;
    private endDate:Date;

    constructor(name:string,module:Module,startDate:Date,endDate:Date,description?:string,id?:number){
        this.id=id
        this.name=name
        this.module=module
        this.startDate=startDate
        this.endDate=endDate
        this.description=description
    }

    getId():number | undefined{
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
        return this.module
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