import { Activities } from "./Activities";

export class Module{
    private id:number;
    private chooseModule:string;
    private description?:string;
    private activities:Activities;

    constructor(id:number,chooseModule:string,activities:Activities,description?:string){
        this.id=id
        this.chooseModule=chooseModule
        this.activities=activities
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
        return this.activities
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