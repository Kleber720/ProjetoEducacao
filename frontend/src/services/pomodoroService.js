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

async function updatePomodoro(id, userId, data) {
    return api("api/pomodoro/" + id, { method: "PUT", body: JSON.stringify({ ...data, userId }) });
}

async function deletePomodoro(id, userId) {
    return api("api/pomodoro/" + id + "?userId=" + userId, { method: "DELETE" });
}

export default { createPomodoro, searchPomodoroByUserId, updatePomodoro, deletePomodoro };
