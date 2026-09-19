import { Password } from "../valuesObject/passwordObject";
import { Email } from "../valuesObject/email";

export class User{
   private id?: number;
   private name: string;
   private password: Password;
   private email:Email;
   private phone:string;

    constructor(name:string,password:string,email:string,phone:string,id?:number){
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

    processName(name:string){
       name.toUpperCase()

       return name;
    }


}

const u1 = new User('kleber','111111111111111111',"kleb@","11111111")

u1.getName
