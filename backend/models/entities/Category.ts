import {User} from "./User"

export class Category{
    private id?:number;
    private nameCategory:string;
    private user?:User;

    constructor(nameCategory:string,user?:User,id?:number){
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

    getUser():User | undefined{
        return this.user
    }
}