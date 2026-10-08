import { Password } from "../valuesObject/passwordObject";
import { Email } from "../valuesObject/email";

export class User{
   private name: string;
   private password: Password;
   private email:Email;
   private phone:string | null;

    constructor(name:string,password:string,email:string,phone:string | null){
        this.name=this.processName(name)
        this.password=new Password(password)
        this.email=new Email(email)
        this.phone=phone
    }

    getName():string{
        return this.name
    }

    getPassword():Password{
        return this.password
    }

    getEmail():Email{
        return this.email
    }

    getPhone():string | null{
        return this.phone
    }

    processName(name:string){
       return name.trim().toUpperCase();
    }


}
