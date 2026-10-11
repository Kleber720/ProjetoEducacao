import { Router } from "express";
import pomodoroController from "../controller/PomodoroController";

const routerPomodoro = Router();

routerPomodoro.post("/pomodoro", pomodoroController.createPomodoro);
routerPomodoro.get("/pomodoro/user/:userId", pomodoroController.searchPomodoroByUserId);

routerPomodoro.put("/pomodoro/:id", pomodoroController.updatePomodoroById);
routerPomodoro.delete("/pomodoro/:id", pomodoroController.deletePomodoroById);

export default routerPomodoro;
