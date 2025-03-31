"use server";
import { cookies } from 'next/headers';

export const fetchLogsData = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    try {
        const response = await fetch("http://10.1.10.153:8080/api/logs/template/", {
            method: 'GET',
            headers: {
                'x-access-token': accessToken,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error("Error fetching data");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};


export const deleteScriptData = async (templateId) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    try {
        const response = await fetch(`http://10.1.10.153:8080/api/logs/template/${templateId}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': accessToken,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error("Failed to delete the template:", errorDetails);
            throw new Error("Failed to delete the template");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting template:", error);
        throw error;
    }
};


export const updateScriptData = async (templateId, data) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    try {
        const response = await fetch(`http://10.1.10.153:8080/api/logs/template/${templateId}`, {
            method: 'PUT',
            headers: {
                'x-access-token': accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });


        if (!response.ok) {
            
            throw new Error("Failed to update the template");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating template:", error);
        throw error;
    }
};

export const uploadScript = async (formData) => {
    const cookieStore = cookies();
    const accessToken = await cookieStore.get('accessToken')?.value;

    try {
        const response = await fetch('http://10.1.10.153:8080/api/logs/template/', {
            method: 'POST',
            headers: {
                'x-access-token': accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return { success: true };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, message: error.message };
    }
};
