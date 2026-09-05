import { IdUser } from "../valueObject/idUser";
export class CornellEntities{
    private id: number;
    private idUser: IdUser;
    private schoolSubject: string;

    constructor(id: number, idUser: IdUser, schoolSubject: string){
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
    }
    getId(): number {
        return this.id;
    }

    getIdUser(): IdUser {
        return this.idUser;
    }

    getSchoolSubject(): string {
        return this.schoolSubject;
    }

    setSchoolSubject(schoolSubject: string): void {
        this.schoolSubject = schoolSubject;
    }

}