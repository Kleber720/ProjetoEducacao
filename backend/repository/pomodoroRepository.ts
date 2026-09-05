import {PomodoroEntities } from "../models/entities/pomodoroEntities";
export interface pomodoroRepository{
    
    createPomodoro(pomodoro: PomodoroEntities): Promise<any>;
    updatePomodoro(pomodoro: PomodoroEntities): Promise<any>;
    searchPomodoroById(id: number): Promise<any>;
    searchPomodoroByIdUser(idUser: number): Promise<any>;
    deletePomodoro(id: number): Promise<any>;

}