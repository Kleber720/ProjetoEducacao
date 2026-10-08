import api from "./api";

async function createPomodoro(userId, title, resume) {
    return api("api/pomodoro", {
        method: "POST",
        body: JSON.stringify({ userId, title, resume })
    });
}

async function searchPomodoroByUserId(userId, signal) {
    return api("api/pomodoro/user/" + userId, { signal });
}

export default { createPomodoro, searchPomodoroByUserId };
