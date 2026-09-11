import { IdUser } from "../valueObject/idUser";
export class FeymannEntities{
    private id: Number;
    private idUser: IdUser;
    private schoolSubject: String;
    private explanation?: String;

    constructor(id: Number, idUser: IdUser, schoolSubject: String, explanation: String){
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
        this.explanation = explanation;
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

    getSummary(): String | undefined {
        return this.explanation;
    }

    setSummary(explanation: String| undefined) {
        this.explanation = explanation;
    }

}