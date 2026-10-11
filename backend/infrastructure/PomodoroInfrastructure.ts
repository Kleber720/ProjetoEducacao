import type { Pomodoro } from "../models/entities/Pomodoro";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import type { PomodoroRepository } from "../repository/PomodoroRepository";
import type { createPomodoroDTO } from "../models/dto/pomodoro/createPomodoroDTO";
import pool from "../config/db";

class PomodoroInfrastructure implements PomodoroRepository {

    async createPomodoro(pomodoro: Pomodoro): Promise<number> {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO pomodoro(userId, title, resume) VALUES(?,?,?)",
            [pomodoro.getUserId(), pomodoro.getTitle(), pomodoro.getResume()]
        );

        return result.insertId;
    }

    async searchPomodoroByUserId(userId: number): Promise<createPomodoroDTO[]> {
        const [pomodoros] = await pool.query<(RowDataPacket & createPomodoroDTO)[]>(
            "SELECT id, userId, title, resume FROM pomodoro WHERE userId = ? ORDER BY id DESC",
            [userId]
        );

        return pomodoros;
    }

    async searchPomodoroById(id: number, userId: number): Promise<createPomodoroDTO | null> {
        const [rows] = await pool.query<(RowDataPacket & createPomodoroDTO)[]>(
            "SELECT id, userId, title, resume FROM pomodoro WHERE id = ? AND userId = ?",
            [id, userId]
        );
        return rows[0] ?? null;
    }

    async updatePomodoroById(id: number, notebook: Pomodoro): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            "UPDATE pomodoro SET title = ?, resume = ? WHERE id = ? AND userId = ?",
            [notebook.getTitle(), notebook.getResume(), id, notebook.getUserId()]
        );
        return result.affectedRows > 0;
    }

    async deletePomodoroById(id: number, userId: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(
            "DELETE FROM pomodoro WHERE id = ? AND userId = ?", [id, userId]
        );
        return result.affectedRows > 0;
    }
}

const pomodoroInfrastructure = new PomodoroInfrastructure();
export default pomodoroInfrastructure;
