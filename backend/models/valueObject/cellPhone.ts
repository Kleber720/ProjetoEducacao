export class cellPhone{
    private cellPhone= String;

    constructor (cellPhone: String){
        if(!this.validateCellPhone(cellPhone.toString())){
            throw new Error("Cell phone invalid");
        }
        this.cellPhone=cellPhone;
    }
}