"use client";
import { useState } from "react";
import { useApiRequest } from "./api_request";
import ResponseDisplay from "./api_responds";

export default function Page() {
    const {
        data,
        error,
        url,
        setUrl,
        method,
        setMethod,
        body,
        setBody,
        sendRequest
    } = useApiRequest("https://api.restful-api.dev/objects");

    const [viewMode, setViewMode] = useState("json");

    const handleSubmit = () => {
        sendRequest();
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === "json" ? "preview" : "json");
    };

    return (
        <div className="flex h-screen w-full bg-white flex space-x-4">
            {/* Left Section: API Request Form */}
            <div className="w-1/2 p-8 bg-blue-200 shadow-lg overflow-y-auto rounded-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">API Request Tool</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-50"
                            placeholder="Enter API URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Method</label>
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                            className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-50"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                        </select>
                    </div>

                    {method === "POST" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Body (JSON format)</label>
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Enter POST body as JSON"
                                rows="6"
                                className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 bg-gray-50"
                            />
                        </div>
                    )}

                    <div>
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                        >
                            Send Request
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Section: API Response */}
            <div className="w-1/2 p-8 bg-gray-200 overflow-y-auto rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Response</h2>
                    <button
                        onClick={toggleViewMode}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {viewMode === "json" ? "Preview" : "JSON"}
                    </button>
                </div>

                <ResponseDisplay data={data} error={error} viewMode={viewMode} />
            </div>
        </div>
    );
}
