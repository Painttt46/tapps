'use client'
import React from 'react';

const renderTable = (data) => {
    if (typeof data !== 'object' || data === null) {
        return <span>{JSON.stringify(data)}</span>;
    }


    const renderRows = (obj) => {
        return Object.entries(obj).map(([key, value], idx) => (
            <tr key={idx} className="border-b border-black">
                <td className="px-6 py-4 font-semibold text-gray-800 border-r border-b border-black">{key}</td>
                <td className="px-6 py-4 text-gray-800 break-words border-b border-black">
                    {typeof value === 'object' && value !== null ? (
                        Array.isArray(value) ? (

                            <div className="pl-4">
                                <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md overflow-hidden border border-black">
                                    <thead className="bg-gray-200 text-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left border-r border-b border-black w-1/3">Index</th>
                                            <th className="px-6 py-3 text-left border-b border-black w-2/3">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {value.map((item, itemIdx) => (
                                            <tr key={itemIdx}>
                                                <td className="px-6 py-4 border-r border-b border-black">{itemIdx + 1}</td>
                                                <td className="px-6 py-4 border-b border-black">

                                                    {typeof item === 'object' && item !== null ? (
                                                        Array.isArray(item) ? (

                                                            <div className="pl-4">
                                                                <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md overflow-hidden border border-black">
                                                                    <thead className="bg-gray-200 text-gray-700">
                                                                        <tr>
                                                                            <th className="px-6 py-3 text-left border-r border-b border-black w-1/3">Index</th>
                                                                            <th className="px-6 py-3 text-left border-b border-black w-2/3">Value</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {item.map((nestedItem, nestedIdx) => (
                                                                            <tr key={nestedIdx}>
                                                                                <td className="px-6 py-4 border-r border-b border-black">{nestedIdx + 1}</td>
                                                                                <td className="px-6 py-4 border-b border-black">{JSON.stringify(nestedItem)}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (

                                                            <div className="pl-4">
                                                                <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md overflow-hidden border border-black">
                                                                    <thead className="bg-gray-200 text-gray-700">
                                                                        <tr>
                                                                            <th className="px-6 py-3 text-left border-r border-b border-black">Field</th>
                                                                            <th className="px-6 py-3 text-left border-b border-black">Value</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>{renderRows(item)}</tbody>
                                                                </table>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <span>{JSON.stringify(item)}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (

                            <div className="pl-4">
                                <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md overflow-hidden border border-black">
                                    <thead className="bg-gray-200 text-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left border-r border-b border-black">Field</th>
                                            <th className="px-6 py-3 text-left border-b border-black">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>{renderRows(value)}</tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <span>{JSON.stringify(value)}</span>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md overflow-hidden border border-black">
            <thead className="bg-gray-200 text-gray-700">
                <tr>
                    <th className="px-6 py-3 text-left border-r border-b border-black w-1/3">Key</th>
                    <th className="px-6 py-3 text-left border-b border-black w-2/3">Value</th>
                </tr>
            </thead>
            <tbody>{renderRows(data)}</tbody>
        </table>
    );
};

export default renderTable;
