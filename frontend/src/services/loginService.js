import api from "./api";

async function login(email,password) {
    const response = await api("api/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
    return response;
    
} 

export default {login};
