export class Pomodoro {
    private userId: number;
    private title: string;
    private resume: string;

    constructor(userId: number, resume: string, title: string) {
        this.userId = userId;
        this.title = title;
        this.resume = resume;
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
