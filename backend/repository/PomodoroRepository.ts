import type { Pomodoro } from "../models/entities/Pomodoro";
import type { createPomodoroDTO } from "../models/dto/pomodoro/createPomodoroDTO";

export interface PomodoroRepository {
    createPomodoro(pomodoro: Pomodoro): Promise<number>;
    searchPomodoroByUserId(userId: number): Promise<createPomodoroDTO[]>;
    searchPomodoroById(id: number, userId: number): Promise<createPomodoroDTO | null>;
    updatePomodoroById(id: number, notebook: Pomodoro): Promise<boolean>;
    deletePomodoroById(id: number, userId: number): Promise<boolean>;
}
