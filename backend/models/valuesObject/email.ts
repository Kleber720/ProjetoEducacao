export class Email{
    email:string

    constructor(email:string){
        this.validateEmail(email);
        this.email=email
    }

    validateEmail(email:string){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            throw new Error("Invalid email format");
        }
    }
}