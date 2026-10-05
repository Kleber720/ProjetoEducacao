import api from "./api";

async function login(name,password) {
    const response = await api("login", {
        method: "POST",
        body: JSON.stringify({ name, password })
    });
    return response;
    
} 

export default {login};