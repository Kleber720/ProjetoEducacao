import type { Request, Response } from "express";
import cornellServices, { CornellError } from "../services/CornellServices";

function respondError(res: Response, error: unknown): void {
    const status = error instanceof CornellError ? error.status : 500;
    const message = error instanceof CornellError ? error.message : "Erro ao acessar o caderno Cornell.";
    res.status(status).json({ message });
}

class CornellController {

    async createCornell(req: Request, res: Response): Promise<void> {
        try {
            const cornell = await cornellServices.createCornell(req.body);
            res.status(201).json(cornell);

        } catch (error) {
            respondError(res, error);
        }
    }

    async searchCornellByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            const cornells = await cornellServices.searchCornellByUserId(userId);
            res.status(200).json(cornells);

        } catch (error) {
            respondError(res, error);
        }
    }

    async updateCornellById(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await cornellServices.updateCornellById(Number(req.params.id), req.body));
        } catch (error) {
            respondError(res, error);
        }
    }

    async deleteCornellById(req: Request, res: Response): Promise<void> {
        try {
            await cornellServices.deleteCornellById(Number(req.params.id), Number(req.query.userId));
            res.status(200).json({ message: "Caderno excluído com sucesso." });
        } catch (error) {
            respondError(res, error);
        }
    }
}

const cornellController = new CornellController();
export default cornellController;
