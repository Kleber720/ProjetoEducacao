import  {User}  from "../models/entities/userEntities";

export interface UserRepository{
    createUser(user: User): Promise<any>;
    updateUser(user: User): Promise<any>;
    searchUserById(id: User): Promise<any>;
    searchUserByEmail(email: User): Promise<any>;
    deleteUser(id: User): Promise<any>;
}