import { Password } from "../valuesObject/passwordObject";
import { Email } from "../valuesObject/email";

export class User{
   private id?: number;
   private name: string;
   private password: Password;
   private email:Email;
   private phone:string | null;

    constructor(name:string,password:string,email:string,phone:string | null,id?:number){
        this.name=this.processName(name)
        this.password=new Password(password)
        this.email=new Email(email)
        this.phone=phone
        this.id=id
    }

    getId():number | undefined{
        return this.id
    }

    getName():string{
        return this.name
    }

    setName(name:string):void{
        this.name=this.processName(name)
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

    getPhone():string | null{
        return this.phone
    }

    setPhone(phone:string | null):void{
        this.phone=phone
    }

    processName(name:string){
       return name.trim().toUpperCase();
    }


}


