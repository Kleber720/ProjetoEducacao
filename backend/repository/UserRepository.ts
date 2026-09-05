import  {UserEntities}  from "../models/entities/UserEntities";

export interface UserRepository{

    createUser(user: UserEntities): Promise<any>;
    updateUser(user: UserEntities): Promise<any>;
    searchUserById(id: UserEntities): Promise<any>;
    searchUserByEmail(email: UserEntities): Promise<any>;
    deleteUser(id: UserEntities): Promise<any>;
    
}