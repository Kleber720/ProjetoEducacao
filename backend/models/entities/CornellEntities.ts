import { IdUser } from "../valueObject/idUser";
export class CornellEntities{
    private id: Number;
    private idUser: IdUser;
    private schoolSubject: String;

    constructor(id: Number, idUser: IdUser, schoolSubject: String){
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
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

}