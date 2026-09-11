import { IdUser } from "../valueObject/idUser";
export class EstudoIntercaladoEntities{
    private id: Number;
    private idUser: IdUser;
    private schoolSubject: String;
    private schoolSubject2:String;
    private timer: Number;

    constructor(id: Number, idUser: IdUser, schoolSubject: String, schoolSubject2: String, timer:Number){
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
        this.schoolSubject2 = schoolSubject2;
        this.timer = timer;


       
    }
    getId(): Number {
        return this.id;
    }

    getIdUser(): IdUser {
        return this.idUser;
    }

     getSchoolSubject(): String {
            return this.schoolSubject;
        }
        setSchoolSubject(schoolSubject: String): void {
            this.schoolSubject = schoolSubject;
        }

        getSchoolSubject2(): String{
            return this.schoolSubject2;
        }
        
        setSchoolSubject2(schoolSubject2: String): void {
            this.schoolSubject2 = schoolSubject2;
        }

        getTimer(): Number {
            return this.timer;
        }

        setTimer(timer: Number): void {
            this.timer = timer;
        }
}