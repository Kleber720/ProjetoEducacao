import { User } from "../models/entities/User";

export interface UserRepository {
    createUser(user:User): Promise<User>;
    getUserById(id:Number): Promise<User | null>;
    deleteUserById(id:number): Promise<void>;
    updateUserById(id:number, user:User): Promise<User | null>;
}