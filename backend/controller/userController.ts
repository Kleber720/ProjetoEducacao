import type { Request, Response } from 'express';
import userService from '../services/UserServices';
import { UserError } from '../services/UserErrors';

function routeText(value: unknown): string {
    if (typeof value !== 'string' || !value.trim()) throw new UserError('Parâmetro de busca inválido.', 400);
    return value.trim();
}

function routeId(value: unknown): number {
    const text = routeText(value);
    const id = Number(text);
    if (!/^\d+$/.test(text) || !Number.isSafeInteger(id) || id <= 0) throw new UserError('ID de usuário inválido.', 400);
    return id;
}

function respondError(res: Response, error: unknown, login = false): void {
    let status = 500;
    let message = 'Erro ao processar a operação de usuário.';
    if (error instanceof UserError) {
        status = error.status;
        message = error.message;
    } else if (error && typeof error === 'object' && 'code' in error && error.code === 'ER_DUP_ENTRY') {
        status = 409;
        message = 'E-mail ou telefone já cadastrado.';
    }
    res.status(status).json(login ? { success: false, message } : { message });
}

class UserController {
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body ?? {};
        if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password.trim()) {
            res.status(400).json({ success: false, message: 'Informe e-mail e senha.' });
            return;
        }
        try {
            const user = await userService.login(email, password);
            if (!user) {
                res.status(401).json({ success: false, message: 'E-mail ou senha incorretos.' });
                return;
            }
            res.status(200).json({ success: true, user });
        } catch (error) {
            respondError(res, error, true);
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            res.status(201).json(await userService.createUser(req.body));
        } catch (error) {
            respondError(res, error);
        }
    }

    async searchUser(_req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await userService.searchUser());
        } catch (error) {
            respondError(res, error);
        }
    }

    async searchUserById(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await userService.searchUserById(routeId(req.params.id)));
        } catch (error) {
            respondError(res, error);
        }
    }

    async searchUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await userService.searchUserByEmail(routeText(req.params.email)));
        } catch (error) {
            respondError(res, error);
        }
    }

    async searchUserByName(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await userService.searchUserByName(routeText(req.params.name)));
        } catch (error) {
            respondError(res, error);
        }
    }

    async deleteUserById(req: Request, res: Response): Promise<void> {
        try {
            await userService.deleteUserById(routeId(req.params.id));
            res.status(200).json({ message: 'Usuário excluído com sucesso.' });
        } catch (error) {
            respondError(res, error);
        }
    }

    async updateUserById(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json(await userService.updateUserById(routeId(req.params.id), req.body));
        } catch (error) {
            respondError(res, error);
        }
    }
}

export default new UserController();
