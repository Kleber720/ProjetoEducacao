import { User } from "../models/entities/User";
import { createUserDTO } from "../models/dto/user/createUserDTO";
import { responseSearchUserByEmailDTO } from "../models/dto/user/responseSearchUserByEmailDTO";
import {responseSearchUserByIdDTO} from "../models/dto/user/responseSearchUserByIdDTO";
import { updateUserDTO } from "../models/dto/user/updateUserDTO";
import { responseSearchUserByNameDTO } from "../models/dto/user/responseSearchUserByNameDTO";
import userInfrastructure from "../infrastructure/UserInfrastructure"
import { responseSearchUserDTO } from "../models/dto/user/responseSearchUserDTO";

class UserServices {

    async  createUser(userDTO: createUserDTO): Promise <any>{
        
        try{
            const user= new User(userDTO.name,userDTO.password,userDTO.email,userDTO.phone);
            await userInfrastructure.createUser(user);

        }catch(erro){
            throw new Error(`Error when registering a user: ${erro}` )
        }
    }
    async searchUser(responseSearchUserDTO: responseSearchUserDTO): Promise<any>{
        try{
            const user= await userInfrastructure.searchUser();
            return user

        }catch(error){
            throw new Error(`Error when searching for a user: ${error}`)
        }
    }

    async searchUserById(responseSearchUserByIdDTO: responseSearchUserByIdDTO): Promise<any> {
        try{
            const id= await userInfrastructure.searchUserById(responseSearchUserByIdDTO.id);
            return id;

        }catch(error){
            throw new Error(`Error when searching for a user by ID: ${error}`)
        }
    }

    async searchUserByEmail(responseSearchUserByEmailDTO: responseSearchUserByEmailDTO): Promise<any> {
        try{
            const email= await userInfrastructure.searchUserByEmail(responseSearchUserByEmailDTO.email);
            return email;

        }catch(error){
            throw new Error(`Error when searching for a user by email: ${error}`)
        }
    }

    async searchUserByName(responseSearchUserByNameDTO: responseSearchUserByNameDTO): Promise<any> {
        try{
            const name= await userInfrastructure.searchUserByName(responseSearchUserByNameDTO.name);
            return name;

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

    async updateUserById(id: number, userDTO: updateUserDTO): Promise<updateUserDTO> {
        try{
            const userExistent= await userInfrastructure.searchUserById(id);
            if(!userExistent){
                throw new Error("User not found");
            }

            const userUpdated= new User(
            userDTO.name || userExistent.name,
            userDTO.password || userExistent.password,
            userDTO.email || userExistent.email,
            userDTO.phone || userExistent.phone
            );

            await userInfrastructure.updateUserById(id, userUpdated);

            const userResponse: updateUserDTO= {
                id: id,
                name: String(userUpdated.getName()),
                password: String(userUpdated.getPassword()),
                email: String(userUpdated.getEmail()),
                phone: String(userUpdated.getPhone())
            } 

            return userResponse;

        }catch(error){
            throw new Error(`Error when updating a user: ${error}`)
        }

        
        
    }


}

const userServices= new UserServices(); 
export default userServices;