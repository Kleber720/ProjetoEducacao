export class Age {
   private age: number;

    constructor(age:number){
        if(age<0 || age>120){
            throw new Error("Age must be between 0 and 120");
        }
        this.age=age
    }

    getAge(): number{
        return this.age;
    }

}