const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? "Something went wrong");
    return data;
}

export const api = {
    //Auth
    signin: (body: { email: string; password: string }) =>
        request("/users/login", { method: "POST", body: JSON.stringify(body) }),
    signup: (body: { username: string; password: string }) =>
        request("/users/register", {
            method: "POST",
            body: JSON.stringify(body),
        }),

    signout: () => request("/users/logout", { method: "POST" }),
};
