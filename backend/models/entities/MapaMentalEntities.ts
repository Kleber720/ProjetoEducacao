import { IdUser } from "../valueObject/idUser";

export class MapaMentalEntities {

    private id: number;
    private idUser: IdUser;
    private schoolSubject: string;
    private ramification?: string;

    constructor(id: number, idUser: IdUser, schoolSubject: string, ramification?: string) {
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
        this.ramification = ramification;
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

    setRamification(ramification: string | undefined): void {
        this.ramification = ramification;
    }

    getRamification(): string | undefined {
        return this.ramification;
    }


}