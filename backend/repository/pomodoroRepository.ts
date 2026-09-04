import { Pomodoro } from "../models/entities/pomodoroEntities";
export interface pomodoroRepository{
    createPomodoro(pomodoro: Pomodoro): Promise<any>;
    updatePomodoro(pomodoro: Pomodoro): Promise<any>;
    searchPomodoroById(id: number): Promise<any>;
    searchPomodoroByIdUser(idUser: number): Promise<any>;
    deletePomodoro(id: number): Promise<any>;

}