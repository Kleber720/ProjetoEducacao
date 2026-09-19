import { User } from "../models/entities/User";
import { createUserDTO } from "../models/dto/user/createUserDTO";
import { searchUserByEmailDTO } from "../models/dto/user/searchUserByEmailDTO";
import userInfrastructure from "../infrastructure/UserInfrastructure"

class UserServices {

  

    async  createUser(userDTO: createUserDTO): Promise <any>{
        try{
            const user= new User(userDTO.name,userDTO.password,userDTO.email,userDTO.phone);
            await userInfrastructure.createUser(user);
        }catch(erro){
            throw new Error(`Error when registering a user: ${erro}` )
        }
    }
}