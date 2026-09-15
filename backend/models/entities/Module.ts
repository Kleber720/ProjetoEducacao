import { Activities } from "./Activities";

export class Module{
    private id:number;
    private chooseModule:string;
    private description?:string;
    private Activities:Activities;

    constructor(id:number,chooseModule:string,Activities:Activities,description?:string){
        this.id=id
        this.chooseModule=chooseModule
        this.Activities=Activities
        this.description=description
    }

    getId():number{
        return this.id
    }

    getChooseModule():string{
        return this.chooseModule
    }

    getDescription():string | undefined{
        return this.description
    }

    getActivities():Activities{
        return this.Activities
    }

    chooseModulePomodoro():void{
        // Implementation for choosing a module
        this.chooseModule="Pomodoro Module"
    }

    chooseModuleCornell():void{
        this.chooseModule="Cornell Module"
    }

    chooseModuleMindMapping():void{
        this.chooseModule="Mind Mapping Module"
    }

    chooseModuleFeymann():void{
        this.chooseModule="Feymann Module"
    }

    chooseModuleInterleadstudy():void{
        this.chooseModule="Interlead Study Module"
    }
}