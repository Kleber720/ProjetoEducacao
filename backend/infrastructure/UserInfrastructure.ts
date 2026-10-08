import type { User } from '../models/entities/User';
import pool from '../config/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import type { UserRepository } from '../repository/UserRepository';
import { hashPassword } from '../services/UserCredentials';

class UserInfrastructure implements UserRepository {
    async findUserForLogin(email: string): Promise<RowDataPacket | null> {
        const [users] = await pool.query<RowDataPacket[]>('SELECT id, name, email, phone, password FROM user WHERE email = ? LIMIT 1', [email]);
        return users[0] ?? null;
    }

    async createUser(user: User): Promise<number> {
        const password = await hashPassword(user.getPassword().password);
        const [result] = await pool.query<ResultSetHeader>('INSERT INTO user(name, password, email, phone) VALUES(?,?,?,?)',
            [user.getName(), password, user.getEmail().email, user.getPhone() ?? null]);
        return result.insertId;
    }

    async searchUser(): Promise<RowDataPacket[]> {
        const [users] = await pool.query<RowDataPacket[]>('SELECT id, name, email, phone FROM user');
        return users;
    }

    
    async searchUserById(id: number): Promise<RowDataPacket[]> {
        const [users] = await pool.query<RowDataPacket[]>('SELECT * FROM user WHERE id = ?', [id]);
        return users;
    }

    async searchUserByName(name: string): Promise<RowDataPacket[]> {
        const [users] = await pool.query<RowDataPacket[]>('SELECT id, name, email, phone FROM user WHERE name LIKE ? ORDER BY name ASC', ['%' + name + '%']);
        return users;
    }

    async searchUserByEmail(email: string): Promise<RowDataPacket[]> {
        const [users] = await pool.query<RowDataPacket[]>('SELECT id, name, email, phone FROM user WHERE email LIKE ? ORDER BY email ASC', ['%' + email + '%']);
        return users;
    }

    async deleteUserById(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>('DELETE FROM user WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    async updateUserById(id: number, user: User, passwordChanged = true): Promise<boolean> {
        let sql = 'UPDATE user SET name = ?, email = ?, phone = ?';
        const values: (string | number | Buffer | null)[] = [user.getName(), user.getEmail().email, user.getPhone() ?? null];
        if (passwordChanged) {
            sql += ', password = ?';
            values.push(await hashPassword(user.getPassword().password));
        }
        sql += ' WHERE id = ?';
        values.push(id);
        const [result] = await pool.query<ResultSetHeader>(sql, values);
        return result.affectedRows > 0;
    }
}

export default new UserInfrastructure();
