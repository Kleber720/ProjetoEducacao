import api from "./api";

export async function registerUser(name, email, password) {
    const response = await api("api/users", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
    });
    return response;
}
export default { registerUser };
