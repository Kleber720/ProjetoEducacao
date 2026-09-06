import {PomodoroEntities } from "../models/entities/pomodoroEntities";
export interface pomodoroRepository{
    
    createPomodoro(pomodoro: PomodoroEntities): Promise<any>;
    updatePomodoro(pomodoro: PomodoroEntities): Promise<any>;
    searchPomodoroById(id: Number): Promise<any>;
    searchPomodoroByIdUser(idUser: Number): Promise<any>;
    deletePomodoro(id: Number): Promise<any>;

}