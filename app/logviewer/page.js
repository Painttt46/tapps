"use client";
import { useState } from "react";
import { FaSearch, FaUndo } from "react-icons/fa"; // Importing the icons
import FetchData from "./FetchData";
import Feature from "./Feature";
import LogTable from "./LogTable";

export default function Page() {
    const { data, columns } = FetchData();
    const [filteredData, setFilteredData] = useState(data);
    const [searchQuery, setSearchQuery] = useState(""); // Add state to manage search query
    const [filters, setFilters] = useState({}); // Add state for column filters

    // Function to apply search and filters to data
    const applyFilters = () => {
        let updatedData = data;

        // Apply search query filter
        if (searchQuery) {
            updatedData = updatedData.filter(item =>
                columns.some(col =>
                    item[col]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        // Apply column filters
        Object.entries(filters).forEach(([column, value]) => {
            if (value) {
                updatedData = updatedData.filter(item =>
                    item[column]?.toString().toLowerCase().includes(value.toLowerCase())
                );
            }
        });

        setFilteredData(updatedData);
    };

    // Function to reset all filters and show the original data
    const handleReset = () => {
        setSearchQuery(""); // Reset search query
        setFilters({}); // Reset filters
        setFilteredData(data); // Reset data to original
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/*<div className="bg-orange-300 w-49 p-6 rounded-lg shadow-lg mb-8 flex items-center">
                <h1 className="text-3xl font-extrabold text-gray-800 text-center" style={{ fontSize: '26px' }}>
                    Log Viewer
                </h1>
            </div>*/}

            {/* Feature Component */}
            <div className="flex flex-col gap-6 mb-6 items-start">
                <Feature columns={columns} data={data} setData={setFilteredData} />
            </div>

            {/* Log Table */}
            <LogTable data={filteredData} columns={columns} />
        </div>
    );
}
