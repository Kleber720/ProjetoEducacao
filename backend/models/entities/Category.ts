import {User} from "./User"

export class Category{
    private id:number;
    private name:string;
    private User:User;

    constructor(id:number,name:string,User:User){
        this.id=id
        this.name=name
        this.User=User
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
        return this.User
    }
}