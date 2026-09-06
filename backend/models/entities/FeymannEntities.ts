import { IdUser } from "../valueObject/idUser";
export class FeymannEntities{
    private id: Number;
    private idUser: IdUser;
    private schoolSubject: String;
    private summary?: String;

    constructor(id: Number, idUser: IdUser, schoolSubject: String, summary: String){
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
        this.summary = summary;
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
        return this.summary;
    }

    setSummary(summary: String| undefined): void {
        this.summary = summary;
    }

}