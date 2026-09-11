import { IdUser } from "../valueObject/idUser";
import { Age } from "../valueObject/age";
import { Email } from "../valueObject/email";
import{ Password } from "../valueObject/password";


export class UserEntities{
   id: IdUser;
   private userName: String;
   private age: Age;
   private email: Email;
   private password: Password;
   private tel: String;

    constructor(idUser:IdUser,userName: String, age: Age, email: Email, password: Password, tel: String){
        this.id = idUser;
        this.userName = userName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.tel = tel;
    }

    getId(): IdUser {
        return this.id;
    }

    getName(): String {
        return this.userName;
    }
    setName(name: String): void {
        this.userName = name;
    }

    getAge(): Age {
        return this.age;
    }

    setAge(age: Age): void {
        this.age = age;
    }

    getEmail(): Email {
        return this.email;
    }

    setEmail(email: Email): void {
        this.email = email;
    }

    getPassword(): Password {
        return this.password;
    }

   setPassword(password: Password): void {
        this.password = password;
    }

    getTel(): String {
        return this.tel;
    }

    setTel(tel: String): void {
        this.tel = tel;
    }

}

