import { IdUser } from "../valueObject/idUser";

export class UserEntities{
   id: IdUser;
   private userName: String;
   private age: Number;
   private email: String;
   private password: String;
   private tel: String;

    constructor(idUser:IdUser,userName: String, age: Number, email: String, password: String, tel: String){
        this.id = idUser;
        this.userName = userName;
        this.age = age;
        this.email = email;
        this.password = password;
        if (this.password.length < 8 ) {
            throw new Error("A senha deve ter pelo menos 8 caracteres e conter pelo menos um caractere especial!");
        }
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

    getAge(): Number {
        return this.age;
    }

    setAge(age: Number): void {
        this.age = age;
    }

    getEmail(): String {
        return this.email;
    }

    setEmail(email: String): void {
        this.email = email;
    }

    getPassword(): String {
        return this.password;
    }

    setPassword(password: String): void {
        if (password.length < 8 ) {
            throw new Error("A senha deve ter pelo menos 8 caracteres e conter pelo menos um caractere especial!");
        }
        this.password = password;
    }

    getTel(): String {
        return this.tel;
    }

    setTel(tel: String): void {
        this.tel = tel;
    }

}

