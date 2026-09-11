export class Email{
    private email: String;

    constructor(email:string){
        if(!this.validateEmail(email)){
            throw new Error("Email invalid");
        }
        this.email = email;
    }

    getEmail(): String{
        return this.email;
    }
    
    setEmail(email: String): void {
        if(!this.validateEmail(email.toString())){
            throw new Error("Email invalid");
        }
        this.email = email;
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}