import { User } from "../models/entities/User";
import {UserDTO} from "../models/dto/user/UserDTO"
import { UserInfrastructure } from "../infrastructure/UserInfrastructure"

class UserServices {

    public processName(nome: string): string{
        return nome.trim().toUpperCase();

    }

    async 
}