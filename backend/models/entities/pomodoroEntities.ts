import { IdUser } from "../valueObject/idUser";


export class PomodoroEntities{
    private id: Number;
    private idUser: IdUser;
    private schoolSubject: String;
    private studyTime: Number;
    private timeDescanse: Number;


    constructor(id:Number,idUser:IdUser, schoolSubject: String, studyTime: Number, timeDescanse: Number = 5){
        this.id = id;
        this.idUser=idUser;
        this.schoolSubject = schoolSubject;
        this.studyTime = studyTime;
        this.timeDescanse=timeDescanse
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
        return this.studyTime;
    }

    setTime(studyTime: Number): void {
        this.studyTime = studyTime;
    }

    getTimeDescanse(): Number {
        return this.timeDescanse;
    }

    setTimeDescanse(timeDescanse: Number): void {
        this.timeDescanse = timeDescanse;
    }

    


}




