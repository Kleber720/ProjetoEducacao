import { Activities } from "./Activities";

export class Module{
    private id?:number;
    private chooseModule:string;
    private chooseModule2?:string;
    private description?:string;
    private activities:Activities;

    constructor(chooseModule:string,activities:Activities,description?:string,chooseModule2?:string,id?:number){
        this.id=id
        this.chooseModule=chooseModule
        this.chooseModule2=chooseModule2
        this.activities=activities
        this.description=description
    }

    getId():number | undefined{
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

    getChooseModule2():string | undefined{
        return this.chooseModule2
    }


    chooseModulePomodoro():void{
        // Implementation for choosing a module
        this.chooseModule="Pomodoro Module"

        if(this.chooseModule2){
            this.chooseModule2="Pomodoro Module"
        }

    }

    chooseModuleCornell():void{
        this.chooseModule="Cornell Module"

        if(this.chooseModule2){
            this.chooseModule2="Cornell Module"
        }
    }

    chooseModuleMindMapping():void{
        this.chooseModule="Mind Mapping Module"

        if(this.chooseModule2){
            this.chooseModule2="Mind Mapping Module"
        }
    }

    chooseModuleFeymann():void{
        this.chooseModule="Feymann Module"

        if(this.chooseModule2){
            this.chooseModule2="Feymann Module"
        }
    }

    chooseModuleInterleadstudy():void{
        this.chooseModule="Interlead Study Module"

        if(this.chooseModule2){
            this.chooseModule2="Interlead Study Module"
        }
    }
}