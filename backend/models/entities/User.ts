import { Password } from "../valuesObject/passwordObject";
import { Email } from "../valuesObject/email";

export class User{
   private id: number;
   private name: string;
   private password: Password;
   private email:Email;
   private phone:string;

    constructor(id:number,name:string,password:Password,email:Email,phone:string){
        this.id=id
        this.name=name
        this.password=password
        this.email=email
        this.phone=phone
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

    getPassword():Password{
        return this.password
    }

    setPassword(password:Password):void{
        this.password=password
    }

    getEmail():Email{
        return this.email
    }

    setEmail(email:Email):void{
        this.email=email
    }

    getPhone():string{
        return this.phone
    }

    setPhone(phone:string):void{
        this.phone=phone
    }


}