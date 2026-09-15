import { User } from "./User";
export class Theme{
    private id:number;
    private name:string;
    private description?:string;
    private User:User;

    constructor(id:number,name:string,User:User,description?:string){
        this.id=id
        this.name=name
        this.User=User
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

    getUser():User{
        return this.User
    }
}