import React, { useState, useEffect } from "react";
import renderTable from "./api_table";

const ResponseDisplay = ({ data, error, viewMode }) => {
    const [stateData, setStateData] = useState(null);
    const [stateError, setStateError] = useState(null);

    useEffect(() => {
        if (data) {
            setStateData(data);
        }
        if (error) {
            setStateError(error);
        }
    }, [data, error]);

    return (
        <div className="bg-white p-4 rounded-md shadow-lg overflow-auto max-h">
            {stateError ? (
                <div className="text-red-600 text-sm">{`Error: ${stateError}`}</div>
            ) : (
                <>
                    {viewMode === "json" ? (
                        <pre className="whitespace-pre-wrap break-words text-sm text-gray-900">
                            {stateData ? JSON.stringify(stateData, null, 2) : "No data available"}
                        </pre>
                    ) : (
                        stateData && Object.keys(stateData).length > 0 ? (
                            Object.entries(stateData).map(([key, value], index) => (
                                <div key={index} className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">index : {key}</h3>

                                    {renderTable(value)}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-900">No data available</p>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default ResponseDisplay;
