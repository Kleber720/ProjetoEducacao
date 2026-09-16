import {ActivitiesRepository} from "../repository/ActivitiesRepository"
import { Activities } from "../models/entities/Activities"
import { RowDataPacket, ResultSetHeader } from "mysql2"
import pool from "../config/db"

export class ActivitiesInfrastructure implements ActivitiesRepository{

    async createActivities(activities: Activities): Promise<any>{
        const connection  = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "INSERT INTO activities(description, exercises, theme, status) VALUES(?,?,?,?)",
                [activities.getDescription(), activities.getExercises(), activities.getTheme().getId(), activities.getStatus()]
            );
            return result;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async getActivitiesById(id:number): Promise<any>{
        const connection = await pool.getConnection();
        try{
            const[response] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM activities WHERE id = ?",
                [id]
            );

            return response;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async getActivitiesByIdTheme(theme: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [response] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM activities WHERE theme= ?",
                [theme]
            );

            return response;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async deleteActivitiesById(id: number): Promise<void> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "DELETE FROM activities WHERE id= ?",
                [id]
            );
           
        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async updateActivitiesById(id: number, activities: Activities): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [result]= await connection.query<ResultSetHeader>(
                "UPDATE FROM activities SET description=?, exercises=?, status=?  WHERE id=?",
                [activities.setDescription,activities.setExercises,activities.getStatus, id]
            );
            return result;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    
}