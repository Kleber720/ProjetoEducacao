export class Password{
    password:string
    

    constructor(password:string){
        this.validatePassword(password);
        this.password=password
    }

    validatePassword(password:string){
        if(this.password.length < 6 || !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)){
            throw new Error("Password must be at least 6 characters long and contain at least one letter and one number");
        }
    }
}