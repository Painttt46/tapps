import { useState } from "react";

export default function LogTable({ data, columns }) {
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const handleSort = (col) => {
        if (sortedColumn === col) {
            if (sortOrder === "asc") {
                setSortOrder("desc");
            } else if (sortOrder === "desc") {
                setSortedColumn(null);
                setSortOrder(null);
            } else {
                setSortOrder("asc");
            }
        } else {
            setSortedColumn(col);
            setSortOrder("asc");
        }
    };

    const sortedData = [...data];
    if (sortedColumn && sortOrder) {
        sortedData.sort((a, b) => {
            if (!a[sortedColumn] || !b[sortedColumn]) return 0;
            const valA = a[sortedColumn];
            const valB = b[sortedColumn];

            if (typeof valA === "number" && typeof valB === "number") {
                return sortOrder === "asc" ? valA - valB : valB - valA;
            }

            if (typeof valA === "string" && typeof valB === "string") {
                return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }

            return 0;
        });
    }

    const renderCell = (value) => {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return value;
    };

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        {columns.map((col) => (
                            <th key={col} className="p-2 border border-gray-300 cursor-pointer" onClick={() => handleSort(col)}>
                                {col} {sortedColumn === col ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col) => (
                                <td key={col} className="p-2 border border-gray-300">{renderCell(row[col])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
