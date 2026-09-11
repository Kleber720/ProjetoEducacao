export class Password{
    private password: String;

    constructor(password: string){
        this.validatePassword(password);
        this.password=password
    }
    getPassword(): String{
        return this.password;
    }
    validatePassword(password: string): boolean {
        if(password.length < 8 && !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
            throw new Error("A senha deve ter pelo menos 8 caracteres e conter pelo menos um caractere especial!");
            return false;
        }
        return true;
    }
}