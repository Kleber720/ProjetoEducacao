import {User} from "./User"

export class Category{
    private id?:number;
    private name:string;
    private user:User;

    constructor(name:string,user:User,id?:number){
        this.id=id
        this.name=name
        this.user=user
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

    getUser():User{
        return this.user
    }
}