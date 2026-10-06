import api from "./api";

async function registerUser(name, email, password) {
    const response = await api("register", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
    });
    return response;
}
export default { registerUser };