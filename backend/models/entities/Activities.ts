import { Theme } from "./Theme";

export class Activities{
    private id?:number;
    private description:string;
    private exercises:string;
    private theme:Theme;
    private status:boolean;

    constructor(description:string,exercises:string,theme:Theme,status:boolean,id?:number){
        this.id=id
        this.description=description
        this.exercises=exercises
        this.theme=theme
        this.status=status
    }

    getId():number | undefined{
        return this.id
    }

    getDescription():string{
        return this.description
    }

    setDescription(description:string):void{
        this.description=description
    }

    getExercises():string{
        return this.exercises
    }

    setExercises(exercises:string):void{
        this.exercises=exercises
    }

    getTheme():Theme{
        return this.theme
    }

    getStatus():boolean{
        return this.status
    }

    setStatus(status:boolean):void{
        this.status=status
    }
}