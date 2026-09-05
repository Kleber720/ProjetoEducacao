import { IdUser } from "../valueObject/idUser";
export class EstudoIntercaladoEntities{
    private id: number;
    private idUser: IdUser;
    private schoolSubject: string;
    private schoolSubject2: string;
    private timer: number;

    constructor(id: number, idUser: IdUser, schoolSubject: string, schoolSubject2: string, timer:number){
        this.id = id;
        this.idUser = idUser;
        this.schoolSubject = schoolSubject;
        this.schoolSubject2 = schoolSubject2;
        this.timer = timer;


       
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

        getSchoolSubject2(): string {
            return this.schoolSubject2;
        }
        
        setSchoolSubject2(schoolSubject2: string): void {
            this.schoolSubject2 = schoolSubject2;
        }

        getTimer(): number {
            return this.timer;
        }

        setTimer(timer: number): void {
            this.timer = timer;
        }
}