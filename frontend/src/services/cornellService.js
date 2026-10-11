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

async function updateCornell(id, userId, data) {
    return api("api/cornell/" + id, { method: "PUT", body: JSON.stringify({ ...data, userId }) });
}

async function deleteCornell(id, userId) {
    return api("api/cornell/" + id + "?userId=" + userId, { method: "DELETE" });
}

export default { createCornell, searchCornellByUserId, updateCornell, deleteCornell };
