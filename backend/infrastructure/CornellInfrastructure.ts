import type { Cornell } from "../models/entities/Cornell";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import type { CornellRepository } from "../repository/CornellRepository";
import type { createCornellDTO } from "../models/dto/cornell/createCornellDTO";
import pool from "../config/db";

class CornellInfrastructure implements CornellRepository {

    async createCornell(cornell: Cornell): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO cornell(userId, title, description, resume, noteClass) VALUES(?,?,?,?,?)",
            [cornell.getUserId(), cornell.getTitle(), cornell.getDescription(), cornell.getResume(), cornell.getNoteClass()]
        );

        return result.insertId;
    }

    async searchCornellByUserId(userId: number): Promise<createCornellDTO[]> {
        const [cornells] = await pool.query<(RowDataPacket & createCornellDTO)[]>(
            "SELECT id, userId, title, description, resume, noteClass FROM cornell WHERE userId = ? ORDER BY id DESC",
            [userId]
        );

        return cornells;
    }

    async searchCornellById(id: number, userId: number): Promise<createCornellDTO | null> {
        const [rows] = await pool.query<(RowDataPacket & createCornellDTO)[]>(
            "SELECT id, userId, title, description, resume, noteClass FROM cornell WHERE id = ? AND userId = ?",
            [id, userId]
        );
        return rows[0] ?? null;
    }

    async updateCornellById(id: number, notebook: Cornell): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            "UPDATE cornell SET title = ?, description = ?, resume = ?, noteClass = ? WHERE id = ? AND userId = ?",
            [notebook.getTitle(), notebook.getDescription(), notebook.getResume(), notebook.getNoteClass(), id, notebook.getUserId()]
        );
        return result.affectedRows > 0;
    }

    async deleteCornellById(id: number, userId: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            "DELETE FROM cornell WHERE id = ? AND userId = ?", [id, userId]
        );
        return result.affectedRows > 0;
    }
}

const cornellInfrastructure = new CornellInfrastructure();
export default cornellInfrastructure;
