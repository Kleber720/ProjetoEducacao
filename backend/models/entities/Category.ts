import {UserId} from "../valuesObject/UserId";

export class Category{
    private id?:number;
    private nameCategory:string;
    private user?:UserId;

    constructor(nameCategory:string,user?:UserId,id?:number){
        this.id=id
        this.nameCategory=nameCategory
        this.user=user
    }

    getId():number | undefined{
        return this.id
    }

    getName():string{
        return this.nameCategory
    }

    setName(nameCategory:string):void{
        this.nameCategory=nameCategory
    }

    getUser():UserId | undefined{
        return this.user
    }
}