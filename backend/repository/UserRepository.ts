import { User } from "../models/entities/User";

export interface UserRepository {
    createUser(user:User): Promise<User>;
    getUserByName(name:string): Promise<any>;
    getUserById(id:number): Promise<any>;
    getUserByEmail(email:string): Promise<any>;
    deleteUserById(id:number): Promise<void>;
    updateUserById(id:number, user:User): Promise<boolean>;
}