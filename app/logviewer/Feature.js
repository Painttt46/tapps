"use client";
import { useState } from "react";
import { FaFilter, FaSearch, FaUndo } from "react-icons/fa";
import { apiUrl } from "./FetchData";

export default function Feature({ columns, data, setData }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [selectedColumns, setSelectedColumns] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleCheckboxChange = (column, checked) => {
        setSelectedColumns(prev => ({
            ...prev,
            [column]: checked,
        }));

        if (!checked) {
            setFilters(prev => {
                const newFilters = { ...prev };
                delete newFilters[column];
                return newFilters;
            });
        }
    };

    const handleFilterChange = (column, value) => {
        setFilters(prev => ({
            ...prev,
            [column]: value,
        }));
    };

    const SearchFilters = () => {
        let filteredData = data;

        // Normalize the search query (lowercase and trim)
        const normalizedSearchQuery = searchQuery.trim().toLowerCase();

        if (normalizedSearchQuery) {
            filteredData = filteredData.filter(item =>
                columns.some(col => {
                    if (item[col]) {
                        const value = item[col].toString().toLowerCase().trim();

                        if (!isNaN(value)) {
                            // For numbers, use partial match (e.g., search for '100' and return '100', '110', '150')
                            return value.includes(normalizedSearchQuery);
                        }

                        // For strings, use partial match (e.g., search for 'Mass' and return 'Massive')
                        return value.includes(normalizedSearchQuery);
                    }
                    return false;
                })
            );
        }

        // Apply other filters (e.g., date ranges, error types) using partial match
        Object.entries(filters).forEach(([column, value]) => {
            if (value) {
                filteredData = filteredData.filter(item => {
                    if (item[column]) {
                        const filterValue = value.toLowerCase().trim();
                        const itemValue = item[column].toString().toLowerCase().trim();

                        // Check for partial match for other filters (like strings)
                        return itemValue.includes(filterValue);
                    }
                    return false;
                });
            }
        });

        setData(filteredData); // Update the state with filtered data
    };





    const handleReset = () => {
        setSearchQuery("");
        setFilters({});
        async function fetchData() {
            const response = await fetch(apiUrl);
            const result = await response.json();
            setData(result);
        }
        fetchData();
    };

    return (
        <>
            {/* Search and Filter UI */}
            <div className="w-full max-w-lg flex items-center gap-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="relative">
                <button
                    className="mt-4 flex items-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <FaFilter className="mr-2" />
                    Select Columns to Filter
                </button>
                {isDropdownOpen && (
                    <div className="absolute top-full left-0 bg-white border rounded-lg shadow-lg mt-2 w-64 p-4">
                        {columns.map((col) => (
                            <div key={col} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedColumns[col] || false}
                                    onChange={(e) => handleCheckboxChange(col, e.target.checked)}
                                    className="mr-2 sty"
                                />
                                <label className="text-gray-700">{col}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Filter Inputs for Selected Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {columns.map((col) =>
                                selectedColumns[col] ? (
                                    <div key={col} className="flex flex-col mb-2 font-semibold">
                                        <label className="mb-1 text-gray-700">{col}</label>
                                        <input
                                            type="text"
                                            placeholder={`Filter by ${col}`}
                                            value={filters[col] || ""}
                                            onChange={(e) => handleFilterChange(col, e.target.value)}
                                            className="p-3 w-60 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>

                        {/* Apply and Reset Buttons */}
            <div className="flex gap-4 mb-4">
                <button
                    onClick={SearchFilters}
                    className="p-3 w-35 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center"
                >
                    <FaSearch className="mr-2" />
                    Search
                </button>
                <button
                    onClick={handleReset}
                    className="p-3 w-35 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition flex items-center justify-center"
                >
                    <FaUndo className="mr-2" />
                    Reset
                </button>
            </div>

        </>
    );
}
