import type { Pomodoro } from "../models/entities/Pomodoro";
import type { createPomodoroDTO } from "../models/dto/pomodoro/createPomodoroDTO";

export interface PomodoroRepository {
    createPomodoro(pomodoro: Pomodoro): Promise<number>;
    searchPomodoroByUserId(userId: number): Promise<createPomodoroDTO[]>;
}
