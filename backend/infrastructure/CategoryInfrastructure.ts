import {CategoryRepository} from "../repository/CategoryRepository"
import { Category } from "../models/entities/Category"
import { RowDataPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"

export class CategoryInfrastructure implements CategoryRepository{

    async createCategory(category: Category): Promise<any> {
        const connection= await pool.getConnection()
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "INSERT INTO category(name,user) VALUES (??)",
                [category.getName,category.getUser]
            )
            return result.insertId;

        }catch(error){
            connection.rollback()
            throw error

        }finally{
            connection.release()
        }
    }

    async getCategoryById(id: number): Promise<any> {
            
            const connection= await pool.getConnection();
            try{
                const [category]= await connection.query<RowDataPacket[]>( 
                    "SELECT * FROM category WHERE id = ?",
                    [id]
                )
                return category
    
            }catch(error){
                connection.rollback
                throw error
    
            }finally{
                connection.release
            }
        }
        

    async getCategoryByName(name: string): Promise<any> {
        const connection= await pool.getConnection();
        try{
            const [category]= await connection.query<RowDataPacket[]>(
                "SELECT * FROM category WHERE name LIKE ? ORDER BY name ASC",
                [`%${name}%`]
            )
            return category

        }catch(error){
            connection.rollback
            throw error

        }finally{
            connection.release
        }
    }

    async getCategoryByIdUser(user: number): Promise<any> {
        const connection= await pool.getConnection();
        try{
            const [category]= await connection.query<RowDataPacket[]>(
                "SELECT * FROM category WHERE id = ?",
                [user]
            )
            return category

        }catch(error){
            connection.rollback
            throw error

        }finally{
            connection.release
        }
    }

    async deleteCategoryById(id: number): Promise<void> {
        const connection= await pool.getConnection();
        try{
            const [result]= await connection.query<ResultSetHeader>(
                "DELETE FROM category WHERE id=? ",
                [id]
            )

        }catch(error){
            connection.rollback
            throw error

        }finally{
            connection.release
        }
    }

    async updateCategoryById(id: number, category: Category): Promise<any> {
        const connection= await pool.getConnection()
        try{
            const [result]= await connection.query<ResultSetHeader>(
                "UPDATE category SET name= ? WHERE id= ?"
                [category.getName,id]
            )
            return result

        }catch (error){
            connection.rollback
            throw error

        }finally{
            connection.release
        }
    }

}