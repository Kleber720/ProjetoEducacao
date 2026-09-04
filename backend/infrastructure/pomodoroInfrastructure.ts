import { pomodoroRepository } from "../repository/pomodoroRepository";

export class PomodoroInfrastructure implements pomodoroRepository{

    // Implement the methods defined in the pomodoroRepository interface
    
    async createPomodoro(pomodoro: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async updatePomodoro(pomodoro: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async searchPomodoroById(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async searchPomodoroByIdUser(idUser: number): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async deletePomodoro(id: number): Promise<any> {
        throw new Error('Method not implemented.');
    }

}