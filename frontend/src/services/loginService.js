import api from "./api";

const USER_KEY = "edukation.user";

async function login(email, password) {
    const response = await api("api/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    if (response.success) {
        sessionStorage.setItem(USER_KEY, JSON.stringify(response.user));
    }

    return response;
}

function getUser() {
    try {
        return JSON.parse(sessionStorage.getItem(USER_KEY));

    } catch {
        return null;
    }
}

function logout() {
    sessionStorage.removeItem(USER_KEY);
}

export default { login, getUser, logout };
