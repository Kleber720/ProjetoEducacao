import { User } from "../models/entities/User";
import { createUserDTO } from "../models/dto/user/createUserDTO";
import { responseSearchUserByEmailDTO } from "../models/dto/user/responseSearchUserByEmailDTO";
import {responseSearchUserByIdDTO} from "../models/dto/user/responseSearchUserByIdDTO"
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

    async searchUserById(responseSearchUserByIdDTO: responseSearchUserByIdDTO): Promise<any> {
        try{
            const user= await userInfrastructure.searchUserById(responseSearchUserByIdDTO.id);
            return user;

        }catch(error){
            throw new Error(`Error when searching for a user by ID: ${error}`)
        }
    }

    async searchUserByEmail(responseSearchUserByEmailDTO: responseSearchUserByEmailDTO): Promise<any> {
        try{
            const user= await userInfrastructure.searchUserByEmail(responseSearchUserByEmailDTO.email);
            return user;

        }catch(error){
            throw new Error(`Error when searching for a user by email: ${error}`)
        }
    }

    async searchUserByName(name: string): Promise<any> {
        try{
            const user= await userInfrastructure.searchUserByName(name);
            return user;

        }catch(error){
            throw new Error(`Error when searching for a user by name: ${error}`)
        }
    }

    async deleteUserById(id: number): Promise<void> {
        try{
            const userExistent= await userInfrastructure.searchUserById(id);
            if(!userExistent){
                throw new Error("User not found");
            }

            const result= await userInfrastructure.deleteUserById(id);

        }catch(error){
            throw new Error(`Error when deleting a user: ${error}`)
        }
    }


}

const userServices= new UserServices();
export default userServices;