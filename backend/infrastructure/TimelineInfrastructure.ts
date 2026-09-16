import { TimelineRepository } from "../repository/TimelineRepository";
import { Timeline } from "../models/entities/Timeline";
import { ResultSetHeader,RowDataPacket } from "mysql2";
import pool from "../config/db";

export class TimelineInfrastructure implements TimelineRepository{

    async createTimeline(timeline: Timeline): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "INSERT INTO timeline(name,description,module,startDate,endDate) VALUES(name=?,description=?,module=?,startDate=?,endDate=?)",
                [timeline.getName,timeline.setDescription,timeline.getModule,timeline.setStartDate,timeline.setEndDate]
            );
            return result;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async getTimelineById(id: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [response] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM timeline WHERE id=?",
                [id]
            );
            return response

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async getTimelineByIdModule(module: number): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [response] = await connection.query<RowDataPacket[]>(
                "SELECT * FROM timeline WHERE module=?",
                [module]
            );
            return response;

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async deleteTimelineById(id: number): Promise<void> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "DELETE FROM timeline WHERE id=?",
                [id]
            );
            
        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
    }

    async updateTimelineById(id: number, timeline: Timeline): Promise<any> {
        const connection = await pool.getConnection();
        try{
            const [result] = await connection.query<ResultSetHeader>(
                "UPDATE timeline SET name=?, description=?, module=?, startDate=?, endDate=? ",
                [timeline.getName,timeline.setDescription,timeline.getModule,timeline.setStartDate,timeline.setEndDate]
            );
            return result

        }catch(error){
            connection.rollback();
            throw error;

        }finally{
            connection.release();
        }

    }
}