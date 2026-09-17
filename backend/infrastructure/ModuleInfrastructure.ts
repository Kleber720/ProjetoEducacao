import { ModuleRepository } from "../repository/ModuleRepository"
import { Module } from "../models/entities/Module"
import {RowDataPacket, ResultSetHeader} from "mysql2/promise";
import pool from "../config/db";

export class ModuleInfrastructure implements ModuleRepository{

    async createModule(module: Module): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "INSERT INTO module(chooseModule,description,activities) VALUES(chooseModule=?, description= ?, activities=? )",
                [module.getChooseModule,module.getDescription,module.getActivities]
            );
            return result;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }
    
    async searchModuleById(id: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [response] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM module WHERE id= ? ",
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

    async searchModuleByIdActivities(activities: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [response] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM module WHERE activities= ?",
                [activities]
            )
            return response;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async deleteModuleById(id: number): Promise<void> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "DELETE FROM module WHERE id= ? ",
                [id]
            );
            
        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async updateModuleById(id: number, module: Module): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "UPDATE module SET chooseModule=?, activities=?, description=? FROM id=? ",
                [module.getChooseModule,module.getActivities,module.getDescription, id]
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