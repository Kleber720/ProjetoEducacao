import { IdUser } from "../valueObject/idUser";
export class FeymannEntities{
    private id: number;
    private idUser: IdUser;
    private schoolSubject: string;
    private summary?: string;

    constructor(id: number, idUser: IdUser, schoolSubject: string, summary: string){
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
        this.summary = summary;
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

    getSummary(): string | undefined {
        return this.summary;
    }

    setSummary(summary: string | undefined): void {
        this.summary = summary;
    }

}