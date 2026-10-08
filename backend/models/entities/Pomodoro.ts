export class Pomodoro {
    private id?: number;
    private userId: number;
    private title: string;
    private resume: string;

    constructor(userId: number, resume: string, title: string, id?: number) {
        this.userId = userId;
        this.title = title;
        this.resume = resume;
        this.id = id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getTitle(): string {
        return this.title;
    }

    getResume(): string {
        return this.resume;
    }
}
