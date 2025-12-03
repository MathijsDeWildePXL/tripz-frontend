
const BASE_URL = "https://localhost:7249";

export async function login(username: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Login failed");
    }

    return await response.json();
}
