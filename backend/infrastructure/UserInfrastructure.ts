import { UserRepository } from '../repository/UserRepository';

export class UserInfrastructure implements UserRepository{

    // Implement the methods defined in the UserRepository interface
    async createUser(user: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async updateUser(user: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async searchUserById(id: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async searchUserByEmail(email: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deleteUser(id: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    
}