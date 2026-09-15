import {Category} from "./Category";
export class Theme{
    private id:number;
    private name:string;
    private description?:string;
    private category:Category;

    constructor(id:number,name:string,category:Category,description?:string){
        this.id=id
        this.name=name
        this.category=category
        this.description=description
    }

    getId():number{
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

    getCategory():Category{
        return this.category
    }
}