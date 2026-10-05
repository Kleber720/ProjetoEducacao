const API_URL = "http://localhost:3000/";

async function api(url, options = {}) {

    const response = await fetch(

        `${API_URL}${url}`,

        {
            headers: {

                "Content-Type": "application/json"

            },
            ...options

        }

    );

    if (!response.ok) {

        throw new Error("Erro na requisição");
    }

    return response.json();
}

export default api;
