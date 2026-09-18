import { User } from "../models/entities/User";
import { createUserDTO } from "../models/dto/user/createUserDTO";
import { searchUserByEmailDTO } from "../models/dto/user/searchUserByEmailDTO";
import { UserInfrastructure } from "../infrastructure/UserInfrastructure"

class UserServices {

    public processName(nome: string): string{
        return nome.trim().toUpperCase();

    }

    async 
}