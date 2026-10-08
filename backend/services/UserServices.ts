import { User } from '../models/entities/User';
import type { createUserDTO } from '../models/dto/user/createUserDTO';
import type { updateUserDTO } from '../models/dto/user/updateUserDTO';
import userInfrastructure from '../infrastructure/UserInfrastructure';
import { UserError } from './UserErrors';
import { verifyPassword } from './UserCredentials';

function validId(id: number): number {
    if (!Number.isSafeInteger(id) || id <= 0) throw new UserError('ID de usuário inválido.', 400);
    return id;
}

function validText(value: unknown, field: string): string {
    if (typeof value !== 'string' || !value.trim() || value.trim().length > 255) {
        throw new UserError(field + ' deve ter entre 1 e 255 caracteres.', 400);
    }
    return value.trim();
}

function validEmail(value: unknown): string {
    const email = validText(value, 'E-mail');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new UserError('E-mail inválido.', 400);
    return email;
}

function validPassword(value: unknown): string {
    if (typeof value !== 'string' || !value.trim() || Buffer.byteLength(value, 'utf8') > 1024) {
        throw new UserError('Informe uma senha não vazia de até 1024 bytes.', 400);
    }
    return value;
}

function validPhone(value: unknown): string | null {
    if (value === undefined || value === null || value === '') return null;
    if (typeof value !== 'string' || value.trim().length > 255) throw new UserError('Telefone inválido.', 400);
    return value.trim() || null;
}

function validBody(value: unknown): void {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new UserError('Dados de usuário inválidos.', 400);
}

function publicUser(user: any) {
    return { id: user.id, name: user.name, email: user.email, phone: user.phone ?? null };
}

class UserServices {
    async login(email: string, password: string) {
        const user = await userInfrastructure.findUserForLogin(validText(email, 'E-mail'));
        const provided = validPassword(password);
        if (!user || !await verifyPassword(provided, user.password)) return null;
        return publicUser(user);
    }

    async createUser(userDTO: createUserDTO) {
        validBody(userDTO);
        const user = new User(validText(userDTO.name, 'Nome'), validPassword(userDTO.password), validEmail(userDTO.email), validPhone(userDTO.phone));
        if (user.getName().length > 255) throw new UserError('Nome deve ter até 255 caracteres.', 400);
        const id = await userInfrastructure.createUser(user);
        return { id };
    }

    async searchUser() {
        return (await userInfrastructure.searchUser()).map(publicUser);
    }

    async searchUserById(id: number) {
        const users = await userInfrastructure.searchUserById(validId(id));
        if (users.length === 0) throw new UserError('Usuário não encontrado.', 404);
        return users.map(publicUser);
    }

    async searchUserByEmail(email: string) {
        return (await userInfrastructure.searchUserByEmail(validText(email, 'E-mail'))).map(publicUser);
    }

    async searchUserByName(name: string) {
        return (await userInfrastructure.searchUserByName(validText(name, 'Nome'))).map(publicUser);
    }

    async deleteUserById(id: number): Promise<void> {
        const users = await userInfrastructure.searchUserById(validId(id));
        if (users.length === 0) throw new UserError('Usuário não encontrado.', 404);
        if (!await userInfrastructure.deleteUserById(id)) throw new UserError('Usuário não encontrado.', 404);
    }

    async updateUserById(id: number, userDTO: updateUserDTO) {
        validId(id);
        validBody(userDTO);
        const fields = ['name', 'password', 'email', 'phone'] as const;
        if (!fields.some((field) => Object.hasOwn(userDTO, field))) throw new UserError('Informe pelo menos um campo para atualizar.', 400);
        const users = await userInfrastructure.searchUserById(id);
        if (users.length === 0) throw new UserError('Usuário não encontrado.', 404);
        const current = users[0];
        const passwordChanged = Object.hasOwn(userDTO, 'password');
        const user = new User(
            Object.hasOwn(userDTO, 'name') ? validText(userDTO.name, 'Nome') : current.name,
            passwordChanged ? validPassword(userDTO.password) : '',
            Object.hasOwn(userDTO, 'email') ? validEmail(userDTO.email) : current.email,
            Object.hasOwn(userDTO, 'phone') ? validPhone(userDTO.phone) : current.phone,
        );
        if (user.getName().length > 255) throw new UserError('Nome deve ter até 255 caracteres.', 400);
        if (!await userInfrastructure.updateUserById(id, user, passwordChanged)) throw new UserError('Usuário não encontrado.', 404);
        return { id, name: user.getName(), email: user.getEmail().email, phone: user.getPhone() };
    }
}

export default new UserServices();
