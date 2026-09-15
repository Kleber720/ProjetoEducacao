import {User} from "./User"

export class Category{
    private id:number;
    private name:string;
    private user:User;

    constructor(id:number,name:string,user:User){
        this.id=id
        this.name=name
        this.user=user
    }

    getId():number{
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