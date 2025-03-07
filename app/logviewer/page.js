"use client";
import { useState, useEffect } from "react";
import { FaFilter, FaSearch, FaUndo } from "react-icons/fa"; // React-icons for nice icons

export default function DynamicTable() {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({});
    const [selectedColumns, setSelectedColumns] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://api.sampleapis.com/wines/reds");
            const result = await response.json();
            setData(result);
            if (result.length > 0) {
                setColumns(Object.keys(result[0]));
            }
        }
        fetchData();
    }, []);

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

    const applyFilters = () => {
        let filteredData = data;

        if (searchQuery) {
            filteredData = filteredData.filter(item =>
                columns.some(col =>
                    item[col]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        Object.entries(filters).forEach(([column, value]) => {
            if (value) {
                filteredData = filteredData.filter(item =>
                    item[column]?.toString().toLowerCase().includes(value.toLowerCase())
                );
            }
        });

        setData(filteredData);
    };

    const handleReset = () => {
        setSearchQuery("");
        setFilters({});
        setSelectedColumns({});
        async function fetchData() {
            const response = await fetch("https://api.sampleapis.com/wines/reds");
            const result = await response.json();
            setData(result);
        }
        fetchData();
    };

    const renderCell = (value) => {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return value;
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col gap-6 mb-6 items-center">
                {/* Search Input */}
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

                {/* Dropdown with checkboxes for each column */}
                <div className="relative">
                    <button
                        className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
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
                                        className="mr-2"
                                    />
                                    <label className="text-gray-700">{col}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Display filter inputs for selected columns in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {columns.map((col) =>
                    selectedColumns[col] ? (
                        <div key={col} className="flex mb-2">
                            <input
                                type="text"
                                placeholder={`Filter by ${col}`}
                                value={filters[col] || ""}
                                onChange={(e) => handleFilterChange(col, e.target.value)}
                                className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ) : null
                )}
            </div>

            {/* Apply and Reset Buttons */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={applyFilters}
                    className="p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition flex items-center"
                >
                    <FaSearch className="mr-2" />
                    Search
                </button>
                <button
                    onClick={handleReset}
                    className="p-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition flex items-center"
                >
                    <FaUndo className="mr-2" />
                    Reset
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="p-2 border border-gray-300">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col) => (
                                    <td key={col} className="p-2 border border-gray-300">{renderCell(row[col])}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
