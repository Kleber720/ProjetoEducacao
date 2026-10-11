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
        this.validateNotebook(pomodoroDTO);

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

    private validateNotebook(pomodoroDTO: createPomodoroDTO): void {
        if (!pomodoroDTO || typeof pomodoroDTO.title !== "string" || !pomodoroDTO.title.trim() || pomodoroDTO.title.trim().length > 255) {
            throw new PomodoroError("Informe um título de até 255 caracteres.", 400);
        }

        if (typeof pomodoroDTO.resume !== "string" || Buffer.byteLength(pomodoroDTO.resume, "utf8") > 65535) {
            throw new PomodoroError("Anotações inválidas ou muito longas.", 400);
        }

    }

    private verifyNotebookId(id: number): void {
        if (!Number.isSafeInteger(id) || id <= 0) {
            throw new PomodoroError("ID de caderno inválido.", 400);
        }
    }

    async updatePomodoroById(id: number, data: createPomodoroDTO): Promise<createPomodoroDTO> {
        this.verifyNotebookId(id);
        this.validateNotebook(data);
        await this.verifyUser(data.userId);
        const existing = await pomodoroInfrastructure.searchPomodoroById(id, data.userId);
        if (!existing) throw new PomodoroError("Caderno não encontrado.", 404);
        const notebook = new Pomodoro(data.userId, data.resume, data.title.trim());
        const updated = await pomodoroInfrastructure.updatePomodoroById(id, notebook);
        if (!updated && !await pomodoroInfrastructure.searchPomodoroById(id, data.userId)) {
            throw new PomodoroError("Caderno não encontrado.", 404);
        }
        return { id, userId: data.userId, title: notebook.getTitle(), resume: notebook.getResume() };
    }

    async deletePomodoroById(id: number, userId: number): Promise<void> {
        this.verifyNotebookId(id);
        await this.verifyUser(userId);
        if (!await pomodoroInfrastructure.deletePomodoroById(id, userId)) {
            throw new PomodoroError("Caderno não encontrado.", 404);
        }
    }
}

const pomodoroServices = new PomodoroServices();
export default pomodoroServices;
