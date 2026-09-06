import { IdUser } from "../valueObject/idUser";

export class MapaMentalEntities {

    private id: Number;
    private idUser: IdUser;
    private schoolSubject: String;
    private ramification?: String;

    constructor(id: Number, idUser: IdUser, schoolSubject: String, ramification?: String) {
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
        this.ramification = ramification;
    }

    getId(): Number {
        return this.id;
    }

    getIdUser(): IdUser {
        return this.idUser;
    }

    getSchoolSubject():String {
        return this.schoolSubject;
    }
    
    setSchoolSubject(schoolSubject: String): void {
        this.schoolSubject = schoolSubject;
    }

    setRamification(ramification: String | undefined): void {
        this.ramification = ramification;
    }

    getRamification(): String | undefined {
        return this.ramification;
    }


}