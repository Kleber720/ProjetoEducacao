import type { User } from '../models/entities/User';
import type { RowDataPacket } from 'mysql2/promise';

export interface UserRepository {
    findUserForLogin(email: string): Promise<RowDataPacket | null>;
    createUser(user: User): Promise<number>;
    searchUser(): Promise<RowDataPacket[]>;
    searchUserByName(name: string): Promise<RowDataPacket[]>;
    searchUserById(id: number): Promise<RowDataPacket[]>;
    searchUserByEmail(email: string): Promise<RowDataPacket[]>;
    deleteUserById(id: number): Promise<boolean>;
    updateUserById(id: number, user: User, passwordChanged?: boolean): Promise<boolean>;
}
