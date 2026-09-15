import { Theme } from "./Theme";

export class Activities{
    private id:number;
    private description:string;
    private exercises:string;
    private Theme:Theme;
    private status:boolean;

    constructor(id:number,description:string,exercises:string,Theme:Theme,status:boolean){
        this.id=id
        this.description=description
        this.exercises=exercises
        this.Theme=Theme
        this.status=status
    }

    getId():number{
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
        return this.Theme
    }

    getStatus():boolean{
        return this.status
    }

    setStatus(status:boolean):void{
        this.status=status
    }
}