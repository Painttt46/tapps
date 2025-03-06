import { useState } from "react";
import { getDataFromAPI } from "./conapi";
export const useApiRequest = (initialUrl = "", initialMethod = "GET", initialBody = "") => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(initialUrl);
    const [method, setMethod] = useState(initialMethod);
    const [body, setBody] = useState(initialBody);

    const sendRequest = async () => {
        try {
            const result = await getDataFromAPI(url, method, {}, method === "POST" ? JSON.parse(body) : null);
            setData(result);
            setError(null);
        } catch (err) {
            setError(err.message);
            setData(null);
        }
    };

    return {
        data,
        error,
        url,
        setUrl,
        method,
        setMethod,
        body,
        setBody,
        sendRequest
    };
};

