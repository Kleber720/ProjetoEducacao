import { User } from "../models/entities/User";
import pool from "../config/db";
import {RowDataPacket, ResultSetHeader} from "mysql2/promise";
import {UserRepository} from "../repository/UserRepository"

export class UserInfrastructure implements UserRepository{

   async createUser(user: User): Promise<any> {
        const connection= await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "INSERT INTO user(name, password, email, phone) VALUES(?,?,?,?)",
                [user.getName(), user.getPassword(),user.getEmail(), user.getPhone()]   
            )

            return result.insertId;
            
        }catch(error){
            await connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async getUserById(id: number): Promise<any> {
            
            const connection= await pool.getConnection();
            try{
                const [user] = await connection.query<RowDataPacket[]>(
                    "SELECT * FROM user WHERE id = ?",
                    [id]
                )
                return user
    
            }catch(error){
                await connection.rollback();
                throw error;
    
            }finally{
                connection.release();
            }
    }

    async getUserByName(name:string): Promise <any> {
        const connection=  await pool.getConnection();
        try{
            const [user] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM user WHERE name LIKE ? ORDER BY name ASC",
                [`%${name}%`]
            )
            return user

        }catch(error){
            await connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async getUserByEmail(email:string): Promise <any> {
        const connection=  await pool.getConnection();
        try{
            const [user]= await connection.query<RowDataPacket[]>(
                "SELECT * FROM user WHERE email LIKE ? ORDER BY email ASC",
                [`%${email}%`]
            )
            return user

        }catch(error){
            await connection.rollback();
            throw error;
        
        }finally{
            connection.release();
        }
    }

    async deleteUserById(id:number): Promise<void> {
        const connection= await pool.getConnection();
        try{
            await connection.query(
                "DELETE FROM user WHERE id = ?",
                [id]
            )

        }catch(error){
            await connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async updateUserById(id:number, user:User): Promise<boolean> {
        const connection= await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "UPDATE user SET name = ?, password = ?, email = ?, phone = ? WHERE id = ?",
                [user.getName(), user.getPassword(), user.getEmail(), user.getPhone(), id]
            )
            return result.affectedRows > 0 

        }catch(error){
            await connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }
}