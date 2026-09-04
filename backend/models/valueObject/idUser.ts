export class IdUser{
    private idUser: Number;

    constructor(idUser: Number){
        this.idUser = idUser;
    }

    getIdUser(): Number {
        return this.idUser;
    }
}

const id= new IdUser(1);