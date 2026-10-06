import { User } from "../models/entities/User";

export interface UserRepository {
    findUserForLogin(email: string): Promise<any>;
    createUser(user:User): Promise<User>;
    searchUser(): Promise<any>
    searchUserByName(name:string): Promise<any>;
    searchUserById(id:number): Promise<any>;
    searchUserByEmail(email:string): Promise<any>;
    deleteUserById(id:number): Promise<void>;
    updateUserById(id:number, user:User): Promise<boolean>;
}
