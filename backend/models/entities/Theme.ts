import { CategoryId } from "../valuesObject/CategoryId";

export class Theme{

    private id?:number;
    private name:string;
    private description?:string;
    private category:CategoryId;

    constructor(name:string,category:CategoryId,description?:string,id?:number){
        this.id=id
        this.name=name
        this.category=category
        this.description=description
    }

    getId():number | undefined{
        return this.id
    }

    getName():string{
        return this.name
    }
    
    setName(name:string){
        this.name=name
    }

    getDescription():string|undefined{
        return this.description
    }

    setDescription(description:string):void {
        this.description=description
    }

    getCategory():CategoryId{
        return this.category
    }
}