// SearchFilter.js
import React, { useState } from "react";

const SearchFilter = ({ onFilter }) => {
    const titles = ["Title", "Vendor", "Model", "Software Version", "Technical Service", "Action"];

    const [vendor, setVendor] = useState("");
    const [technicalService, setTechnicalService] = useState("");
    const [action, setAction] = useState("");
    const [title, setTitle] = useState(""); // Added state for title filter
    const [model, setModel] = useState(""); // Added state for model filter
    const [softwareVersion, setSoftwareVersion] = useState(""); // Added state for software version filter

    const handleVendorChange = (e) => setVendor(e.target.value);
    const handleTechnicalServiceChange = (e) => setTechnicalService(e.target.value);
    const handleActionChange = (e) => setAction(e.target.value);
    const handleTitleChange = (e) => setTitle(e.target.value); // Handler for title filter
    const handleModelChange = (e) => setModel(e.target.value); // Handler for model filter
    const handleSoftwareVersionChange = (e) => setSoftwareVersion(e.target.value); // Handler for software version filter

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ vendor, technicalService, action, title, model, softwareVersion }); // Pass model and software version to filter as well
    };

    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white mb-6 mt-11">
            <div className="flex flex-col mb-4 items-center font-bold bg-yellow-200 p-2 w-full rounded-lg" style={{ fontSize: '16px' }}>
                Filter Search Network Script
            </div>

            {/* Title Input */}
            <div className="flex items-center mb-3">
                <label htmlFor="search-title" className="block font-semibold w-1/10" style={{ fontSize: '14px' }}>
                    {titles[0]} :
                </label>
                <input
                    id="search-title"
                    type="text"
                    placeholder={titles[0]}
                    value={title}
                    onChange={handleTitleChange}
                    className="p-2 w-9/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-8"
                    style={{ fontSize: '14px' }}
                />
            </div>

            {/* Vendor Dropdown */}
            <div className="flex items-center mb-3">
                <label htmlFor="vendor" className="block font-semibold w-1/10" style={{ fontSize: '14px' }}>
                    Vendor :
                </label>
                <select
                    id="vendor"
                    value={vendor}
                    onChange={handleVendorChange}
                    className="p-1 w-9/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-8"
                    style={{ fontSize: '14px' }}
                >
                    <option value="">Select Vendor</option>
                    <option value="huawei">huawei</option>
                    <option value="juniper">juniper</option>
                </select>
            </div>

            {/* Model Input */}
            <div className="flex items-center mb-3">
                <label htmlFor="model" className="block font-semibold w-1/10" style={{ fontSize: '14px' }}>
                    {titles[2]} :
                </label>
                <input
                    id="model"
                    type="text"
                    placeholder={titles[2]}
                    value={model}
                    onChange={handleModelChange}
                    className="p-2 w-9/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-8"
                    style={{ fontSize: '14px' }}
                />
            </div>

            {/* Software Version Input */}
            <div className="flex items-center mb-3">
                <label htmlFor="software-version" className="block font-semibold w-1/10" style={{ fontSize: '14px' }}>
                    {titles[3]} :
                </label>
                <input
                    id="software-version"
                    type="text"
                    placeholder={titles[3]}
                    value={softwareVersion}
                    onChange={handleSoftwareVersionChange}
                    className="p-2 w-9/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-8"
                    style={{ fontSize: '14px' }}
                />
            </div>

            {/* Technical Service Dropdown */}
            <div className="flex items-center mb-3">
                <label htmlFor="technical-service" className="block font-semibold w-1/10" style={{ fontSize: '14px' }}>
                    Technical Service :
                </label>
                <select
                    id="technical-service"
                    value={technicalService}
                    onChange={handleTechnicalServiceChange}
                    className="p-1 w-9/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-8"
                    style={{ fontSize: '14px' }}
                >
                    <option value="">Select Technical Service</option>
                    <option value="tcc">tcc</option>
                    <option value="inet">inet</option>
                    <option value="ccc">ccc</option>
                    <option value="no">no</option>
                </select>
            </div>

            {/* Action Dropdown */}
            <div className="flex items-center mb-3">
                <label htmlFor="action" className="block font-semibold w-1/10" style={{ fontSize: '14px' }}>
                    Action :
                </label>
                <select
                    id="action"
                    value={action}
                    onChange={handleActionChange}
                    className="p-1 w-9/10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-8"
                    style={{ fontSize: '14px' }}
                >
                    <option value="">Select Action</option>
                    <option value="policer">policer</option>
                    <option value="shaping">shaping</option>
                    <option value="both">both</option>
                </select>
            </div>

            <div className="flex items-center justify-end">
                <button
                    onClick={handleSubmit}
                    className="w-2/10 mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    style={{ fontSize: '14px' }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
