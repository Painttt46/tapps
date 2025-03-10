"use client";
import { useState, useEffect } from "react";

export default function FetchData() {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const apiUrl = "https://api.sampleapis.com/wines/reds";

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl);
            const result = await response.json();
            setData(result);
            if (result.length > 0) {
                setColumns(Object.keys(result[0]));
            }
        }
        fetchData();
    }, []);

    return { data, columns};
}
export const apiUrl = "https://api.sampleapis.com/wines/reds";