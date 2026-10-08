export class UserError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'UserError';
        this.status = status;
    }
}
