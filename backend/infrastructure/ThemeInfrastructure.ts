import {ThemeRepository} from "../repository/ThemeRepository"
import { Theme } from "../models/entities/Theme"
import {RowDataPacket, ResultSetHeader} from "mysql2/promise";
import pool from "../config/db";

export class ThemeInfrastructure implements ThemeRepository{

    async createTheme(theme: Theme): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>
            ("INSERT INTO themes (name, description, category) VALUES (?, ?, ?)", 
            [theme.getName, theme.setDescription, theme.getCategory]);

        return result.insertId;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async searchThemeById(id: number): Promise<any> {
            
            const connection = await pool.getConnection();
            try{
                const [response] = await connection.query<RowDataPacket[]>(
                    "SELECT * FROM themes WHERE id = ?",
                    [id]
                )
                return response
    
            }catch(error){
                connection.rollback();
                throw error;
    
            }finally{
                connection.release();
            }
        }

    async searchThemeByIdCategory(category: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [response] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM themes WHERE category = ?",
                [category]
            )
            return response

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async deleteThemeById(id: number): Promise<void> {
        const connection = await pool.getConnection();
        try{
            await connection.query(
                "DELETE FROM themes WHERE id = ?",
                [id]
            )

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }
    
    async updateThemeById(id: number, theme: Theme): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const result = await connection.query<ResultSetHeader>(
                "UPDATE themes SET name = ?, description = ? WHERE id = ?",
                [theme.getName, theme.setDescription, id]
            )
            return result

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }

    }
    

}