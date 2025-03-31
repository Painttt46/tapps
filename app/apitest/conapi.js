"use server"
import { cookies } from 'next/headers';
export async function getDataFromAPI(url, method = "GET", headers = {}, body = null) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    try {
        const options = {
            method,
            headers: {
                "x-access-token": accessToken,
                "Content-Type": "application/json",
            },

        };

        if (method === "POST" && body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);




        return await res.json();
    } catch (error) {
        return { error: error.message };
    }
}
