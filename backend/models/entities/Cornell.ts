export class Cornell {
    private userId: number;
    private title: string;
    private description: string;
    private resume: string;
    private noteClass: string;

    constructor(userId: number, title: string, description: string, resume: string, noteClass: string) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.resume = resume;
        this.noteClass = noteClass;
    }

    public getUserId(): number {
        return this.userId;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getResume(): string {
        return this.resume;
    }

    public getNoteClass(): string {
        return this.noteClass;
    }

}
