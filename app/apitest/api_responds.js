import renderTable from "./api_table";

const ResponseDisplay = ({ data, error, viewMode }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-lg overflow-auto max-h">
            {error ? (
                <div className="text-red-600 text-sm">{`Error: ${error}`}</div>
            ) : (
                <>
                    {viewMode === "json" ? (
                        <pre className="whitespace-pre-wrap break-words text-sm text-gray-900">
                            {data ? JSON.stringify(data, null, 2) : "No data available"}
                        </pre>
                    ) : (
                        data && Object.keys(data).length > 0 ? (
                            Object.entries(data).map(([key, value], index) => (
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
