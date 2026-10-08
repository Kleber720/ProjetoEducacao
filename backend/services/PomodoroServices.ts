import { Pomodoro } from "../models/entities/Pomodoro";
import type { createPomodoroDTO } from "../models/dto/pomodoro/createPomodoroDTO";
import pomodoroInfrastructure from "../infrastructure/PomodoroInfrastructure";
import userInfrastructure from "../infrastructure/UserInfrastructure";

export class PomodoroError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

class PomodoroServices {

    async verifyUser(userId: number): Promise<void> {
        if (!Number.isSafeInteger(userId) || userId <= 0) {
            throw new PomodoroError("ID de usuário inválido.", 400);
        }

        const users = await userInfrastructure.searchUserById(userId);
        if (users.length === 0) {
            throw new PomodoroError("Usuário não encontrado.", 404);
        }
    }

    async createPomodoro(pomodoroDTO: createPomodoroDTO): Promise<createPomodoroDTO> {
        if (!pomodoroDTO || typeof pomodoroDTO.title !== "string" || !pomodoroDTO.title.trim() || pomodoroDTO.title.trim().length > 255) {
            throw new PomodoroError("Informe um título de até 255 caracteres.", 400);
        }

        if (typeof pomodoroDTO.resume !== "string" || Buffer.byteLength(pomodoroDTO.resume, "utf8") > 65535) {
            throw new PomodoroError("Anotações inválidas ou muito longas.", 400);
        }

        await this.verifyUser(pomodoroDTO.userId);

        const pomodoro = new Pomodoro(pomodoroDTO.userId, pomodoroDTO.resume, pomodoroDTO.title.trim());
        const id = await pomodoroInfrastructure.createPomodoro(pomodoro);

        return {
            id,
            userId: pomodoro.getUserId(),
            title: pomodoro.getTitle(),
            resume: pomodoro.getResume()
        };
    }

    async searchPomodoroByUserId(userId: number): Promise<createPomodoroDTO[]> {
        await this.verifyUser(userId);
        return pomodoroInfrastructure.searchPomodoroByUserId(userId);
    }
}

const pomodoroServices = new PomodoroServices();
export default pomodoroServices;
