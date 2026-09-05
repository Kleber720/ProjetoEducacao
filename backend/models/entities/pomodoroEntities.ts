import { IdUser } from "../valueObject/idUser";


export class PomodoroEntities{
    private id: Number;
    private idUser: IdUser;
    private schoolSubject: String;
    private time: Number;
    private restTime: Number;


    constructor(id:Number,idUser:IdUser, schoolSubject: String, time: Number, restTime: Number = 5){
        this.id = id;
        this.idUser=idUser;
        this.schoolSubject = schoolSubject;
        this.time = time;
        this.restTime=restTime
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

    getTime(): Number {
        return this.time;
    }

    setTime(time: Number): void {
        this.time = time;
    }

    getRestTime(): Number {
        return this.restTime;
    }

    setRestTime(restTime: Number): void {
        this.restTime = restTime;
    }

    


}




