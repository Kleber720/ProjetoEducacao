import api from "./api";

async function createCornell(userId, title, description, resume, noteClass) {
    return api("api/cornell", {
        method: "POST",
        body: JSON.stringify({ userId, title, description, resume, noteClass })
    });
}

async function searchCornellByUserId(userId, signal) {
    return api("api/cornell/user/" + userId, { signal });
}

export default { createCornell, searchCornellByUserId };
