import type { Request, Response } from "express";
import pomodoroServices, { PomodoroError } from "../services/PomodoroServices";

function respondError(res: Response, error: unknown): void {
    const status = error instanceof PomodoroError ? error.status : 500;
    const message = error instanceof PomodoroError ? error.message : "Erro ao acessar o caderno Pomodoro.";
    res.status(status).json({ message });
}

class PomodoroController {

    async createPomodoro(req: Request, res: Response): Promise<void> {
        try {
            const pomodoro = await pomodoroServices.createPomodoro(req.body);
            res.status(201).json(pomodoro);

        } catch (error) {
            respondError(res, error);
        }
    }

    async searchPomodoroByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            const pomodoros = await pomodoroServices.searchPomodoroByUserId(userId);
            res.status(200).json(pomodoros);

        } catch (error) {
            respondError(res, error);
        }
    }

    async updatePomodoroById(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await pomodoroServices.updatePomodoroById(Number(req.params.id), req.body));
        } catch (error) {
            respondError(res, error);
        }
    }

    async deletePomodoroById(req: Request, res: Response): Promise<void> {
        try {
            await pomodoroServices.deletePomodoroById(Number(req.params.id), Number(req.query.userId));
            res.status(200).json({ message: "Caderno excluído com sucesso." });
        } catch (error) {
            respondError(res, error);
        }
    }
}

const pomodoroController = new PomodoroController();
export default pomodoroController;
