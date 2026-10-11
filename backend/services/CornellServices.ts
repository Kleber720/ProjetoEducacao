import { Cornell } from "../models/entities/Cornell";
import type { createCornellDTO } from "../models/dto/cornell/createCornellDTO";
import cornellInfrastructure from "../infrastructure/CornellInfrastructure";
import userInfrastructure from "../infrastructure/UserInfrastructure";

export class CornellError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

class CornellServices {

    async verifyUser(userId: number): Promise<void> {
        if (!Number.isSafeInteger(userId) || userId <= 0) {
            throw new CornellError("ID de usuário inválido.", 400);
        }

        const users = await userInfrastructure.searchUserById(userId);
        if (users.length === 0) {
            throw new CornellError("Usuário não encontrado.", 404);
        }
    }

    async createCornell(cornellDTO: createCornellDTO): Promise<createCornellDTO> {
        this.validateNotebook(cornellDTO);

        await this.verifyUser(cornellDTO.userId);

        const cornell = new Cornell(
            cornellDTO.userId,
            cornellDTO.title.trim(),
            cornellDTO.description,
            cornellDTO.resume,
            cornellDTO.noteClass
        );
        const id = await cornellInfrastructure.createCornell(cornell);

        return {
            id,
            userId: cornell.getUserId(),
            title: cornell.getTitle(),
            description: cornell.getDescription(),
            resume: cornell.getResume(),
            noteClass: cornell.getNoteClass()
        };
    }

    async searchCornellByUserId(userId: number): Promise<createCornellDTO[]> {
        await this.verifyUser(userId);
        return cornellInfrastructure.searchCornellByUserId(userId);
    }

    private validateNotebook(cornellDTO: createCornellDTO): void {
        if (!cornellDTO || typeof cornellDTO.title !== "string" || !cornellDTO.title.trim() || cornellDTO.title.trim().length > 255) {
            throw new CornellError("Informe um título de até 255 caracteres.", 400);
        }

        for (const field of ["description", "resume", "noteClass"] as const) {
            if (typeof cornellDTO[field] !== "string" || Buffer.byteLength(cornellDTO[field], "utf8") > 65535) {
                throw new CornellError("Perguntas, notas ou resumo inválidos ou muito longos.", 400);
            }
        }

    }

    private verifyNotebookId(id: number): void {
        if (!Number.isSafeInteger(id) || id <= 0) {
            throw new CornellError("ID de caderno inválido.", 400);
        }
    }

    async updateCornellById(id: number, data: createCornellDTO): Promise<createCornellDTO> {
        this.verifyNotebookId(id);
        this.validateNotebook(data);
        await this.verifyUser(data.userId);
        const existing = await cornellInfrastructure.searchCornellById(id, data.userId);
        if (!existing) throw new CornellError("Caderno não encontrado.", 404);
        const notebook = new Cornell(data.userId, data.title.trim(), data.description, data.resume, data.noteClass);
        const updated = await cornellInfrastructure.updateCornellById(id, notebook);
        if (!updated && !await cornellInfrastructure.searchCornellById(id, data.userId)) {
            throw new CornellError("Caderno não encontrado.", 404);
        }
        return { id, userId: data.userId, title: notebook.getTitle(), description: notebook.getDescription(), resume: notebook.getResume(), noteClass: notebook.getNoteClass() };
    }

    async deleteCornellById(id: number, userId: number): Promise<void> {
        this.verifyNotebookId(id);
        await this.verifyUser(userId);
        if (!await cornellInfrastructure.deleteCornellById(id, userId)) {
            throw new CornellError("Caderno não encontrado.", 404);
        }
    }
}

const cornellServices = new CornellServices();
export default cornellServices;
