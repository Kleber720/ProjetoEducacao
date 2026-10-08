export class Cornell {
    private id?: number;
    private userId: number;
    private title: string;
    private description: string;
    private resume: string;
    private noteClass: string;

    constructor(userId: number, title: string, description: string, resume: string, noteClass: string, id?: number) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.resume = resume;
        this.noteClass = noteClass;
        this.id = id;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number | undefined): void {
        this.id = id;
    }

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(userId: number): void {
        this.userId = userId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getResume(): string {
        return this.resume;
    }

    public setResume(resume: string): void {
        this.resume = resume;
    }

    public getNoteClass(): string {
        return this.noteClass;
    }

    public setNoteClass(noteClass: string): void {
        this.noteClass = noteClass;
    }

}